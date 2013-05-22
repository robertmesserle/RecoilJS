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
  @attributes:
    '''
    class id src href style
    '''.split( /\s+/g )

  # Methods

  @init: ->
    new Recoil( arguments... )

  @createTransition: ( type, id, callback ) ->
    Recoil.transitions[ type ][ id ] = callback

  constructor: ( @id, @controller )->
    if Recoil.app then throw "You may only have one app running at a time."
    $ ( element ) =>
      $element    = $( element )
      Recoil.app  = new Core( $element, @controller )