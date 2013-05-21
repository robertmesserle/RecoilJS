do ->

  $.fn.makeBoring = ( controller ) ->
    if globals.app then throw 'You may only have one app running at a time.'
    $element      = $( this )
    globals.app   = new Core( $element, controller )

  $.makeBoring = ( id, controller ) ->
    if globals.app then throw 'You may only have one app running at a time.'
    $ -> $( "[data-app='#{ id }']:first" ).makeBoring( controller )

  $.boring =

    createTransition: ( type, id, callback ) ->
      globals.transitions[ type ][ id ] = callback