DirtyCheck = require( './dirty-check.coffee' )

class Router

  @getInstance: ->
    @instance ?= new Router

  event:    'hashchange'
  routes:   []
  defaultRoute: null

  constructor: ->
    @bindEvent()

  bindEvent: ->
    $( window ).on 'hashchange', @handleChange

  handleChange: =>
    hash = location.hash.replace /^#/, ''
    for route in @routes.sort( ( a, b ) -> b.path.length - a.path.length )
      if route.regex.test( hash )
        ret = route.handler( @getParams( hash, route ) )
        DirtyCheck.update()
        return ret
    ret = @defaultRoute?.handler( hash )
    DirtyCheck.update()
    return ret

  getRegex: ( path ) ->
    parts = path.split( '/' )
    for part, index in parts
      if part.charAt( 0 ) is ':'
        parts[ index ] = '[^\\\/]+'
      else
        parts[ index ] = part.replace /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"
    return new RegExp "^#{ parts.join( '\\\/') }"

  mapDefaultRoute: ( handler ) ->
    @defaultRoute =
      handler: handler

  mapRoute: ( path, handler ) ->
    if path instanceof Array
      for p in path then @mapRoute p, handler
    else if typeof path is 'object'
      for key, value of path then @mapRoute key, value
    else
      route =
        regex:    @getRegex( path )
        path:     path
        handler:  handler
      @routes.push route

  getParams: ( hash, route ) ->
    params = {}
    hashParts = hash.split( '/' )
    routeParts = route.path.split( '/' )
    for part, index in routeParts when part.charAt( 0 ) is ':'
      params[ part.substring( 1 ) ] = hashParts[ index ]
    params.$rest = hashParts.slice( routeParts.length ).join( '/' )
    return params

module.exports = Router
