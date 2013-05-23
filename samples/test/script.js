
function Test () {

  var _ = { title: 'test' }

  _.event = function ( event ) {
    console.log( arguments, event )
  }

  return _

}

Recoil.init( 'test', Test() )