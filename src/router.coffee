class Router

  # Static

  @getInstance: ->
    @instance ?= new Router

  # Instance

  event:    'hashchange'
  mode:     document.documentMode
  support:  root[ "on#{ @event }" ]? and ( not @mode? or @mode > 7 )
  routes:   []

  constructor: ->
    @createSpecialEvent()
    @bindEvent()

  bindEvent: ->
    $( window ).on 'hashchange', @handleChange

  handleChange: ( event ) =>
    hash = location.hash.replace /^#/, ''
    for route in @routes
      if route.regex.test( hash )
        return route.handler( @getParams( hash, route ) )

  createSpecialEvent: ->
    $.extend $.event.special[ @event ],
      start: =>
        return false if @support
        @HashListener = new HashListener @event
        $ @HashListener.start
      teardown: =>
        return false if @support
        $ @HashListener.stop

  getRegex: ( path ) ->
    parts = path.split( '/' )
    regex = parts.slice( 0 )
    for part, index in parts
      if part.charAt( 0 ) is ':'
        regex[ index ] = '[^\\\/]+'
      else
        regex[ index ] = part.replace /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"
    return new RegExp "^#{ regex.join( '\\\/') }"

  mapRoute: ( path, handler ) ->
    route =
      regex:    @getRegex( path )
      path:     path
      handler:  handler
    @routes.push route

  getParams: ( hash, route ) ->
    {}