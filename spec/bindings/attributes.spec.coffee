describe 'Attributes Binding', ->

  AttrBinding = Recoil.eval 'AttrBinding'
  $wrapper = $ '<div id="wrap">'

  beforeEach ->
    $wrapper.appendTo( document.body )

  afterEach ->
    $wrapper.empty().remove()

  it 'should exist', ->
    expect( AttrBinding ).toBeDefined()
    expect( AttrBinding ).not.toBe null

  it 'should set attributes', ->
    $wrapper.html $div = $ """<div data-attr="id: 'howdy'">"""
    new AttrBinding $element: $div, scope: {}
    expect( $div.attr( 'id' ) ).toBe 'howdy'

  it 'should update attributes as the data changes', ->
    $wrapper.html $div = $ """<div data-attr="id: id">"""
    scope = { id: 'foo' }
    binding = new AttrBinding $element: $div, scope: scope
    expect( $div.attr( 'id' ) ).toBe 'foo'
    scope.id = 'bar'
    binding.update()
    expect( $div.attr( 'id' ) ).toBe 'bar'

  it 'should remove attributes that were set by it', ->
    $wrapper.html $div = $ """<div data-attr="attrs">"""
    scope = attrs: id: 'foo'
    binding = new AttrBinding $element: $div, scope: scope
    expect( $div.attr( 'id' ) ).toBe 'foo'
    delete scope.attrs.id
    binding.update()
    expect( $div.attr( 'id' ) ).not.toBe 'foo'