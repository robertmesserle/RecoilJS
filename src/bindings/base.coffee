
class Base

  constructor: ( @$element ) ->
    @logic = @$element.data( 'logic' )
    if @logic
      @insertPlaceholder()
      @unwrap()
    if @update then @pushBinding()

  pushBinding: ->
    Recoil.bindings.push( this ) unless @$element.data( 'static' )

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
      '$element': 'this.$element'
      '$root':    'this.root'
      '$parent':  'this.parent'
      '$data':    'this.scope'
      '$scope':   'this.scope'
      '$extras':  'this.extras'
    }
    args = []
    scopeArgs = []
    for key of @scope   when isNaN( key ) then argHash[ key ] = "this.scope[ '#{ key }' ]"
    for key of @extras  when isNaN( key ) then argHash[ key ] = "this.extras[ '#{ key }' ]"
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
    scope = @parseBinding( parts.join( '.' ) ) or @scope
    if typeof scope[ part ] is 'function' then scope[ part ] value
    else scope[ part ] = value

  insertPlaceholder: ->
    str = ( for attr in @$element.get( 0 ).attributes then "#{ attr.nodeName }='#{ attr.value }'" ).join( ' ' )
    @$placeholder = $( """<!-- Start BoringJS Block: #{ str } -->""" ).insertBefore( @$element )
    $( """<!-- End BoringJS Block: #{ str } -->""" ).insertAfter( @$element )

  wrap: ->
    return unless @unwrapped
    @unwrapped = false
    @$contents.eq( 0 ).before( @$element )
    @$element.append( @$contents )

  unwrap: ->
    unless @unwrapped then @unwrapped  = true
    @$contents = @$element.contents().insertAfter( @$element )
    @$element.detach()