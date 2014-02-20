module.exports =

  Parser:      null
  Property:    null

  app:         null
  viewPath:    './views'
  throttle:    30
  bindings:
    read:      []
    write:     []
  views:       {}
  transitions:
    intro:     {}
    outro:     {}
  events:
    '''
    blur focus focusin focusout load resize scroll unload click
    dblclick mousedown mouseup mousemove mouseover mouseout mouseenter
    mouseleave change select submit keydown keypress keyup error
    '''.split( /\s+/g )
