{ events } = require( '../shared.coffee' )
Base       = require( './base.coffee' )

class EventBinding extends Base

  constructor: ( @context, eventName ) ->
    return @parseEvents() unless eventName
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

  parseEvents: ->
    for event in events
      str = @context.$element.data( event )
      continue unless str
      new EventBinding( @context, event )
    
  generateFunction: ( str ) ->
    super str, [ '$event' ]

module.exports = EventBinding
