describe 'IfBinding', ->

  IfBinding = Recoil.eval 'IfBinding'
  $wrapper = $ '<div id="wrap" data-app>'

  beforeEach ->
    $wrapper.appendTo( document.body )

  afterEach ->
    $wrapper.empty().remove()

  it 'should exist', ->
    expect( IfBinding ).not.toEqual null

  it 'should display when truthy', ->
    $div = $( '<div data-if="true">' ).appendTo( $wrapper )
    scope = {}
    binding = new IfBinding $element: $div, scope: scope, root: scope
    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe true

  it 'should be removed when falsey', ->
    $div = $( '<div data-if="false">' ).appendTo( $wrapper )
    scope = {}
    binding = new IfBinding $element: $div, scope: scope, root: scope
    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe false

  it 'should work with scope values', ->
    $div = $( '<div data-if="flag">' ).appendTo( $wrapper )
    scope = flag: true
    binding = new IfBinding $element: $div, scope: scope, root: scope
    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe true

    scope.flag = false
    binding.update()
    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe false

    scope.flag = true
    binding.update()
    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe true

  it 'should work with logic blocks', ->
    $wrapper.html $div = $( '<div data-if="flag" data-logic>' )
    $child = $( '<div>' ).appendTo( $div )
    scope = flag: true
    binding = new IfBinding $element: $div, scope: scope, root: scope

    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe false
    expect( $.contains $wrapper.get( 0 ), $child.get( 0 ) ).toBe true

    scope.flag = false
    binding.update()

    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe false
    expect( $.contains $wrapper.get( 0 ), $child.get( 0 ) ).toBe false

    scope.flag = true
    binding.update()

    expect( $.contains $wrapper.get( 0 ), $div.get( 0 ) ).toBe false
    expect( $.contains $wrapper.get( 0 ), $child.get( 0 ) ).toBe true
