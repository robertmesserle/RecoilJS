class Core

  constructor: ( @$element, @controller ) ->
    if @controller.view then @$element.data( 'compose', 'controller' )
    @afterRender()

  afterRender: =>
    new Parser( @$element, @controller, false, @controller )

  checkForChanges: ->
    setTimeout =>
      for binding in Recoil.bindings
        binding.update()
      @cleanBindings()

  cleanBindings: ->
    count = Recoil.bindings.length
    for index in [ count - 1..0 ]
      binding = Recoil.bindings[ index ]
      element = binding.$placeholder?.get( 0 ) or binding.$element?.get( 0 )
      Recoil.bindings.splice( index, 1 ) unless $.contains( document.body, element )