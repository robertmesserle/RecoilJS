class Recoil

  # Global Data
  
  @app:           null
  @viewPath:      './views'
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

  @createTransition: ( type, id, callback ) ->
    Recoil.transitions[ type ][ id ] = callback

  @checkForChanges: ->
    Recoil.app?.checkForChanges arguments...

  @setViewPath: ( @viewPath ) ->

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
      $element    = $( "[data-app='#{ @id }']" )
      unless $element.length then throw "No element found for id '#{ @id }'."
      Recoil.app  = new Core( $element, @controller )