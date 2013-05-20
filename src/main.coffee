$         = jQuery

$.fn.makeBoring = ( controller ) ->
  if globals.app then throw 'You may only have one app running at a time.'
  $element      = $( this )
  $.boring.globals.app   = new Core( $element, controller )

$.makeBoring = ( id, controller ) ->
  if $.boring.globals.app then throw 'You may only have one app running at a time.'
  $ -> $( "[data-app='#{ id }']:first" ).makeBoring( controller )

$.boring =

  classes: {}

  createTransition: ( type, id, callback ) ->
    $.boring.globals.transitions[ type ][ id ] = callback