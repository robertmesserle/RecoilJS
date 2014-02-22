AttributeText   = require '../../src/bindings/attribute-text.coffee'
{ expect }      = require '../setup.coffee'

describe 'AttributeText', ->
  $wrapper = $ '<div id="wrap">'
  beforeEach -> $wrapper.appendTo document.body
  afterEach -> $wrapper.empty().remove()
  it 'should exist', -> expect( AttributeText ).to.be.ok()
  it 'should not modify normal attributes', ->
    $wrapper.html $div = $ '<div class="foo">'
    scope   = {}
    binding = new AttributeText $element: $div, scope: scope, root: scope
    expect( $div.attr 'class' ).to.be 'foo'
  it 'should update with data', ->
    $wrapper.html $div = $ '<div class="#{ foo }">'
    scope   = foo: 'bar'
    expect( $div.attr 'class' ).to.be '#{ foo }'
    bindings = new AttributeText $element: $div, scope: scope, root: scope
    expect( $div.attr 'class' ).to.be 'bar'
    scope.foo = 'baz'
    for binding in bindings then binding.update()
    expect( $div.attr 'class' ).to.be 'baz'
