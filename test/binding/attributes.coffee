AttrBinding = require '../../src/bindings/attributes.coffee'
{ expect }  = require '../setup.coffee'

describe 'AttrBinding', ->
  $wrapper = $ '<div id="wrap">'
  beforeEach -> $wrapper.appendTo document.body
  afterEach -> $wrapper.empty().remove()
  it 'should exist', -> expect( AttrBinding ).to.be.ok()
  it 'should set attributes', ->
    $wrapper.html $div = $ """<div data-attr="{ id: 'howdy' }">"""
    new AttrBinding $element: $div, scope: {}
    expect( $div.attr 'id' ).to.be 'howdy'
  it 'should update attributes as the data changes', ->
    $wrapper.html $div = $ """<div data-attr="{ id: id }">"""
    scope = id: 'foo'
    binding = new AttrBinding $element: $div, scope: scope
    expect( $div.attr 'id' ).to.be 'foo'
    scope.id = 'bar'
    binding.update()
    expect( $div.attr 'id' ).to.be 'bar'
  it 'should remove attributes that were set by it', ->
    $wrapper.html $div = $ """<div data-attr="attrs">"""
    scope   = attrs: id: 'foo'
    binding = new AttrBinding $element: $div, scope: scope
    expect( $div.attr 'id' ).to.be 'foo'
    delete scope.attrs.id
    binding.update()
    expect( $div.attr 'id' ).not.to.be 'foo'
