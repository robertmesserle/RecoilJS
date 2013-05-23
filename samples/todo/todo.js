function TodoApp () {

  var _ = {}

  _.tasks = []

  _.getTasks = function ( complete ) {
    var ret = []
    for ( var i = 0; i < _.tasks.length; i++ )
      if ( _.tasks[ i ].complete === complete )
        ret.push( _.tasks[ i ] )
    return ret
  }

  _.handleKey = function ( $element, keyCode ) {
    if ( keyCode === 13 ) {
      _.tasks.push( { title: $element.val(), complete: false } )
      $element.val( '' )
    }
  }

  return _
}

Recoil.init( 'todo', TodoApp() )