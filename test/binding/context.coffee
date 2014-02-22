{ expect } = require '../setup.coffee'
Parser         = require '../../src/parser.coffee'
ContextBinding = require '../../src/bindings/context.coffee'

describe 'Context', ->
  $wrapper = $ '<div id="wrap">'
  beforeEach -> $wrapper.appendTo document.body
  afterEach -> $wrapper.empty().remove()
  it 'should exist', -> expect( ContextBinding ).to.be.ok()
  describe 'Setting a context', ->
    $wrapper.html $div = $ '<div data-context="context">'
    $div.html $h1 = $ '<h1>#{ title }</h1>'
    context = title: 'context'
    scope   = context: context
    binding = new ContextBinding $element: $div, scope: scope
    it 'should exist', -> expect( binding ).to.be.ok()
    it 'should have the right context', -> expect( binding.value ).to.be context
    scope.context = title: 'foobar'
    binding.update()
    it 'should have the updated context', -> expect( $div.text() ).to.be 'foobar'
