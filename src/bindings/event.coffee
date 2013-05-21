class EventBinding extends Base

  constructor: ( eventName, @$element, @scope, @parent, @root ) ->
    str         = $element.data( eventName )
    csString    = "-> #{ str }"
    func        = @parseBinding( csString )
    eventName   = "#{ eventName }.boringjs"
    $element
      .off( eventName )
      .on eventName, ( event ) => func.call( this, event )
    
  generateFunction: ( str ) ->
    js = CoffeeScript.compile "do -> #{ str }", bare: true
    args = []
    scopeArgs = []
    for key of @scope when isNaN( key )
      args.push key
      scopeArgs.push "this.scope.#{ key }"
    args.push '$root, $parent, $data'
    scopeArgs.push 'this.root, this.parent, this.scope'
    eval """
      ( function ( event ) {
        return ( function ( #{ args.join( ',' ) } ) {
          return #{ js }
        } ).call( {}, #{ scopeArgs.join( ', ' ) } )
      } )
    """