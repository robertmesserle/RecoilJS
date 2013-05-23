class Recoil

  # Global Data
  
  @app:            null
  @bindings:       []
  @views:          {}
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
    Recoil.app? arguments...

  constructor: ( @id, @controller ) ->
    if Recoil.app then throw "You may only have one app running at a time."
    $ ( element ) =>
      $element    = $( "[data-app='#{ @id }']" )
      unless $element.length then throw "No element found for id '#{ @id }'."
      Recoil.app  = new Core( $element, @controller )