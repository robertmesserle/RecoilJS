describe 'Attribute Text', ->

  AttributeText = Recoil.eval 'AttributeText'
  $wrapper = $ '<div id="wrap">'

  beforeEach ->
    $wrapper.appendTo( document.body )

  afterEach ->
    $wrapper.empty().remove()

  it 'should exist', ->
    expect( AttributeText ).toBeDefined()
    expect( AttributeText ).not.toBeNull()

  it 'should not modify normal attributes', ->
    $wrapper.html $div = $ '<div class="foo">'
    scope = {}
    binding = new AttributeText $element: $div, scope: scope, root: scope
    expect( $div.attr 'class' ).toBe 'foo'

  it 'should replace text', ->
    $wrapper.html $div = $ '<div class="#{ foo }">'
    scope = foo: 'bar'
    expect( $div.attr 'class' ).toBe '#{ foo }'
    binding = new AttributeText $element: $div, scope: scope, root: scope
    expect( $div.attr 'class' ).toBe 'bar'

  it 'should update with data', ->
    $wrapper.html $div = $ '<div class="#{ foo }">'
    scope = foo: 'bar'
    expect( $div.attr 'class' ).toBe( '#{ foo }' )
    bindings = new AttributeText $element: $div, scope: scope, root: scope
    expect( $div.attr 'class' ).toBe 'bar'
    scope.foo = 'baz'
    for binding in bindings then binding.update()
    expect( $div.attr 'class' ).toBe 'baz'