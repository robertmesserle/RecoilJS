
class Base

  constructor: ->
    @logic = @context.$element.data( 'logic' )? 
    if @logic or @if then @insertPlaceholder()
    @pushBinding()

  pushBinding: ->
    return if @context.$element.data( 'static' )?
    bindings = @context.extras?.parentBinding?.bindings
    bindings ?= Recoil.bindings
    bindings.read.push( this ) if @update
    bindings.write.push( this ) if @write

  parseBinding: ( binding, evalFunction = true ) ->
    # Return cached binding if available
    @cachedBindings   ?= {}
    jsBinding         = @cachedBindings[ binding ]
    return jsBinding.call( this ) if jsBinding
    # Otherwise, continue parsing the CoffeeScript into a usable functionkey
    @cachedBindings[ binding ] = @generateFunction( binding )
    if evalFunction then @cachedBindings[ binding ].call( this )
    else @cachedBindings[ binding ]

  parseString: ( str ) ->
    # Return cached binding if available
    @cachedStrings ?= {}
    jsString = @cachedStrings[ str ]
    return jsString.call( this ) if jsString
    # Otherwise, continue parsing the code into a usable function
    str = str.replace( /\"/g, '\\"' )
    str = '"' + str + '"'
    # Generate argument hash
    @cachedStrings[ str ] = @generateFunction( str )
    @cachedStrings[ str ].call( this )

  generateFunction: ( str, customArgs = [] ) ->
    js = Recoil.compile "#{ str }"
    argHash = {
      '$element': 'this.context.$element'
      '$root':    'this.context.root'
      '$parent':  'this.context.parent'
      '$data':    'this.context.scope'
      '$scope':   'this.context.scope'
      '$extras':  'this.context.extras'
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
    parts = binding.split( '.' )
    part  = parts.pop()
    scope = @parseBinding( parts.join( '.' ) ) or @context.scope
    if typeof scope[ part ] is 'function' then scope[ part ] value
    else scope[ part ] = value

  insertPlaceholder: ->
    return if @context.$placeholder
    str = ( for attr in @context.$element.get( 0 ).attributes then "#{ attr.nodeName }='#{ attr.value }'" ).join( ' ' )
    @context.$placeholder = $( """<!-- RecoilJS: #{ str } -->""" ).insertBefore( @context.$element )

  wrap: ->
    return unless @context.unwrapped
    return unless @logic
    @context.unwrapped = false
    @context.$element.insertBefore( @context.$contents ).append( @context.$contents )

  unwrap: ->
    return if @context.unwrapped
    return unless @logic
    @context.unwrapped  = true
    @context.$contents = @context.$element.contents().insertAfter( @context.$element )
    @context.$element.detach()


  checkBindings: ->
    return unless @bindings
    # Iterate over writes first
    for set in [ { type: 'write', method: 'write' }, { type: 'read', method: 'update' } ]
      bindings = @bindings[ set.type ]
      continue unless length = bindings.length
      for index in [ --length..0 ]
        binding = bindings[ index ]
        element = binding.context.$placeholder?.get( 0 ) or binding.context.$element?.get( 0 )
        if $.contains( document.body, element ) then binding[ set.method ]?()
        else bindings.splice( index, 1 )