{ expect } = require '../setup.coffee'
ForBinding = require '../../src/bindings/for.coffee'

describe 'ForBinding', ->
  $wrapper = $ '<div id="wrap" data-app>'

  beforeEach -> $wrapper.appendTo document.body
  afterEach  -> $wrapper.empty().remove()

  it 'should iterate over the items', ->
    $div    = $( '<div data-for="number in numbers"><h1>#{ number }</h1></div>' ).appendTo $wrapper
    scope   = numbers: [ 1, 2, 3, 4, 5 ]
    binding = new ForBinding $element: $div, scope: scope, root: scope

    expect( $div.find( 'h1' ).length ).to.be 5
    expect( $div.find( 'h1:first' ).text() ).to.be '1'
