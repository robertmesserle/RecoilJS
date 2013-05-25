
function Test () {

  var _ = { title: 'test' }

  _.event = function ( event ) {
  }

  return _

}

Recoil.init( 'test', Test() )