class EventBinding extends Base

  constructor: ( eventName, @$element, @scope, @parent, @root, @extras ) ->
    str         = $element.data( eventName )
    csString    = "-> #{ str }"
    func        = @parseBinding( csString )
    eventName   = "#{ eventName }.boringjs"
    $element
      .off( eventName )
      .on eventName, ( event ) => func.call( this, event )
    
  generateFunction: ( str ) ->
    js = CoffeeScript.compile "do -> #{ str }", bare: true
    argHash = {}
    args = []
    scopeArgs = []
    for key of @scope   then argHash[ key ] = "this.scope[ '#{ key }' ]"
    for key of @extras  then argHash[ key ] = "this.extras[ '#{ key }' ]"
    for key, value of argHash
      args.push key
      scopeArgs.push value
    args.push '$root, $parent, $data, $extras'
    scopeArgs.push 'this.root, this.parent, this.scope, this.extras'
    eval """
      ( function ( event ) {
        return ( function ( #{ args.join( ',' ) } ) {
          return #{ js }
        } ).call( {}, #{ scopeArgs.join( ', ' ) } )
      } )
    """