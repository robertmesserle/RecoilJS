describe 'Context Binding', ->

  ContextBinding  = Recoil.eval 'ContextBinding'
  Parser          = Recoil.eval 'Parser'
  DirtyCheck      = Recoil.eval 'DirtyCheck'
  $wrapper        = $ '<div id="wrap">'

  beforeEach ->
    $wrapper.appendTo( document.body )

  afterEach ->
    $wrapper.empty().remove()

  it 'should exist', ->
    expect( ContextBinding ).toBeDefined()
    expect( ContextBinding ).not.toBeNull()

  describe 'Setting a context', ->
    $wrapper.html $div  = $ '<div data-context="context">'
    $div.html $h1 = $ '<h1>#{ title }</h1>'
    context             = { title: 'context' }
    scope               = context: context
    binding             = new ContextBinding $element: $div, scope: scope

    it 'should exist', ->
      expect( binding ).toBeDefined()
      expect( binding ).not.toBe null

    it 'should have the right context', ->
      expect( binding.value ).toBe context

    scope.context = { title: 'foobar' }
    binding.update()

    it 'should have the updated context', ->
      expect( $div.text() ).toBe 'foobar'