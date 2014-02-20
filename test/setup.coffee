{ jsdom }       = require( 'jsdom' )
jquery          = require( 'jquery' )

global.window   = jsdom().createWindow()
global.document = window.document
global.$        = jquery( window )

module.exports =
  expect: require( 'expect.js' )
