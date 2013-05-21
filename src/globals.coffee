globals =
  
  app: null

  bindings: []

  views: {}

  transitions:
    intro: {}
    outro: {}

  events: '''
    blur focus focusin focusout load resize scroll unload click
    dblclick mousedown mouseup mousemove mouseover mouseout mouseenter
    mouseleave change select submit keydown keypress keyup error
  '''.split( /\s+/g )

  attributes: '''
    class id src href style
  '''.split( /\s+/g )