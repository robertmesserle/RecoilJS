class EventBinding extends Base

  constructor: ( eventName, @context ) ->
    str         = @context.$element.data( eventName )
    csString    = "#{ str }"
    func        = @parseBinding( csString, false )
    eventName   = "#{ eventName }.recoil"
    @context.$element
      .off( eventName )
      .on eventName, ( event ) =>
        ret = func.call( this, event )
        if typeof ret is 'function' then ret( event, @context.extras?.item or @context.scope )
        else ret
    
  generateFunction: ( str ) ->
    super str, [ '$event' ]