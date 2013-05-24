class EventBinding extends Base

  constructor: ( eventName, @$element, @scope, @parent, @root, @extras ) ->
    str         = $element.data( eventName )
    csString    = "#{ str }"
    func        = @parseBinding( csString, false )
    eventName   = "#{ eventName }.boringjs"
    $element
      .off( eventName )
      .on eventName, ( event ) =>
        ret = func.call( this, event )
        if typeof ret is 'function' then ret( event, @extras.$item or @scope )
        else ret
    
  generateFunction: ( str ) ->
    super str, [ '$event' ]