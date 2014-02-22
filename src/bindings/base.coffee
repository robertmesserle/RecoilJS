shared   = require '../shared.coffee'
Compiler = require '../compiler.coffee'

class Base

  constructor: ->
    @logic = @context.$element.data( 'logic' )?
    if @logic or @if then @insertPlaceholder()
    @pushBinding()

  getBindings: ->
    bindings = @context.extras?.parentBinding?.bindings
    bindings ?= shared.bindings
    return bindings

  pushBinding: ->
    return if @context.$element.data( 'static' )?
    bindings = @getBindings()
    bindings.read.push( this ) if @update
    bindings.write.push( this ) if @write

  parseBinding: ( binding, evalFunction = true ) ->
    @cachedBindings   ?= {}
    jsBinding         = @cachedBindings[ binding ]
    return jsBinding.call( this ) if jsBinding
    @cachedBindings[ binding ] = @generateFunction binding
    if evalFunction then @cachedBindings[ binding ].call this
    else @cachedBindings[ binding ]

  cleanParentBindings: ->
    bindings = @getBindings()
    for index in [ bindings.length - 1 .. 0 ]
      element = binding.context.$placeholder?.get( 0 ) or binding.context.$element?.get 0
      bindings.splice( index, 1 ) unless $.contains document.body, element

  removeBinding: ->
    bindings = @context.extras?.parentBinding?.bindings
    bindings ?= shared.bindings
    index    = bindings.read.indexOf this
    return unless index + 1
    bindings.read.splice index, 1

  parseString: ( str ) ->
    @cachedStrings ?= {}
    jsString = @cachedStrings[ str ]
    return jsString.call( this ) if jsString
    str = str.replace /\"/g, '\\"'
    str = '"' + str + '"'
    @cachedStrings[ str ] = @generateFunction str
    @cachedStrings[ str ].call this

  generateFunction: ( str, customArgs = [] ) ->
    js = Compiler.compile "#{ str }"
    argHash = {
      $element: 'this.context.$element'
      $root:    'this.context.root'
      $parent:  'this.context.parent'
      $data:    'this.context.scope'
      $scope:   'this.context.scope'
      $extras:  'this.context.extras'
    }
    args = []
    scopeArgs = []
    for key of @context.scope   when isNaN( key ) then argHash[ key ] = "this.context.scope[ '#{ key }' ]"
    for key of @context.extras  when isNaN( key ) then argHash[ key ] = "this.context.extras[ '#{ key }' ]"
    for key, value of argHash
      args.push key
      scopeArgs.push value
    eval """
      ( function ( #{ customArgs.join ',' } ) {
        return ( function ( #{ args.join( ',' ) } ) {
          return #{ js }
        } ).call( {}, #{ scopeArgs.join( ', ' ) } )
      } )
    """

  updateBinding: ( value, binding = @binding ) ->
    parts = binding.split '.'
    part  = parts.pop()
    scope = @parseBinding( parts.join '.' ) or @context.scope
    if typeof scope[ part ] is 'function' then scope[ part ] value
    else scope[ part ] = value

  insertPlaceholder: ->
    return if @context.$placeholder
    str = ( for attr in @context.$element.get( 0 ).attributes then "#{ attr.nodeName }='#{ attr.value }'" ).join ' '
    @context.$placeholder = $( """<!-- RecoilJS: #{ str } -->""" ).insertBefore @context.$element
    @unwrap()

  wrap: ->
    return unless @context.unwrapped
    return unless @logic
    @context.unwrapped = false
    @context.$element.insertBefore @context.$contents
    @context.$contents.appendTo @context.$element

  unwrap: ->
    return if @context.unwrapped
    return unless @logic
    @context.unwrapped = true
    @context.$contents = @context.$element.contents().insertAfter @context.$element
    @context.$element.detach()


  checkBindings: ->
    return unless @bindings
    for set in [ { type: 'write', method: 'write' }, { type: 'read', method: 'update' } ]
      bindings = @bindings[ set.type ]
      for binding in bindings.slice 0
        binding[ set.method ]()

module.exports = Base
