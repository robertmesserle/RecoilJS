define ( require ) ->

  globals = require '../globals'

  class Base

    constructor: ( @$element ) ->
      @logic = @$element.data( 'logic' )
      if @logic
      	@insertPlaceholder()
      	@unwrap()
      if @update then @pushBinding()

    pushBinding: ->
      globals.bindings.push( this )

    parseBinding: ( binding ) ->
      # Return cached binding if available
      @cachedBindings   ?= {}
      jsBinding         = @cachedBindings[ binding ]
      return jsBinding.call( this ) if jsBinding
      # Otherwise, continue parsing the CoffeeScript into a usable functionkey
      @cachedBindings[ binding ] = @generateFunction( binding )
      @cachedBindings[ binding ].call( this )

    parseString: ( str ) ->
      # Return cached binding if available
      @cachedStrings ?= {}
      jsString = @cachedStrings[ str ]
      return jsString.call( this ) if jsString
      # Otherwise, continue parsing the CoffeeScript into a usable function
      str = str.replace( /\"/g, '\\"' )
      str = '"' + str + '"'
      # Generate argument hash
      @cachedStrings[ str ] = @generateFunction( str )
      @cachedStrings[ str ].call( this )

    generateFunction: ( str ) ->
      js = CoffeeScript.compile "do -> #{ str }", bare: true
      args = []
      scopeArgs = []
      for key of @scope when isNaN( key )
        args.push key
        scopeArgs.push "this.scope.#{ key }"
      args.push '$element, $root, $parent, $data, window, document, $'
      scopeArgs.push 'this.$element, this.root, this.parent, this.scope'
      eval """
        ( function () {
          return ( function ( #{ args.join( ',' ) } ) {
            return #{ js }
          } ).call( {}, #{ scopeArgs.join( ', ' ) } )
        } )
      """

    updateBinding: ( value, binding = @binding ) ->
      parts = binding.split( '.' )
      part  = parts.pop()
      scope = @parseBinding( parts.join( '.' ) ) or @scope
      scope[ part ]?( value ) or scope[ part ] = value

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