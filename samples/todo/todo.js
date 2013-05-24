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

  _.checkAll = function () {
    for ( var i = _.tasks.length; i--; )
      _.tasks[ i ].complete = true
  }

  _.clearCompleted = function () {
    for ( var i = _.tasks.length; i--; )
      if ( _.tasks[ i ].complete )
        _.tasks.splice( i, 1 )
  }

  return _
}

Recoil.init( 'todo', TodoApp() )