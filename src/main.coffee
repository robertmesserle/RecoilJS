class Recoil

  # Global Data
  
  @app:           null
  @viewPath:      './views'
  @throttle:      50
  @bindings:      []
  @views:         {}
  @transitions:   
    intro:        {}
    outro:        {}
  @events:
    '''
    blur focus focusin focusout load resize scroll unload click
    dblclick mousedown mouseup mousemove mouseover mouseout mouseenter
    mouseleave change select submit keydown keypress keyup error
    '''.split( /\s+/g )

  # Methods

  @init: ->
    new Recoil( arguments... )

  @mapRoute: ->
    Router.getInstance().mapRoute arguments...

  @createTransition: ( type, id, callback ) ->
    Recoil.transitions[ type ][ id ] = callback

  @setViewPath: ( @viewPath ) ->

  @setMaxUpdateFrequency: ( @throttle ) ->

  @compile: ( str ) ->
    if CoffeeScript?.compile
      CoffeeScript.compile "do -> #{ str }", bare: true
    else
      exp = /.#\{([^\}]*[^\\])\}/g
      str = str.replace( /\n/g, '\\n' )
      str = str.replace exp, ( match, expression ) ->
        firstChar = match.charAt( 0 )
        if firstChar is '\\' then match
        else "#{ firstChar }\" + ( #{ expression } ) + \""
      "( function () { return #{ str }; } )()"

  constructor: ( @id, @controller ) ->
    if Recoil.app then throw "You may only have one app running at a time."
    $ ( element ) =>
      new DirtyCheck()
      $element    = $( "[data-app='#{ @id }']" )
      unless $element.length then throw "No element found for id '#{ @id }'."
      Recoil.app  = new Core( $element, @controller )