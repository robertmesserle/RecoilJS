class EventBinding extends Base

  constructor: ( eventName, @$element, @scope, @parent, @root, @extras ) ->
    str         = $element.data( eventName )
    csString    = "#{ str }"
    func        = @parseBinding( csString, false )
    eventName   = "#{ eventName }.boringjs"
    $element
      .off( eventName )
      .on eventName, ( event ) => func.call( this, event )
    
  generateFunction: ( str ) ->
    super str, [ '$event' ]