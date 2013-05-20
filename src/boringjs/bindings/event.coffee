define ( require ) ->

  Base = require './base'

  class EventBinding extends Base

    constructor: ( event, @$element, @scope, @parent, @root ) ->
      str         = $element.data( event )
      csString    = "-> #{ str }"
      func        = @parseBinding( csString )
      eventName   = "#{ event }.boringjs"
      $element
        .off( eventName )
        .on eventName, ( event ) => func()
      