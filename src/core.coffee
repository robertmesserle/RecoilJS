Parser    = $.boring.classes.Parser
globals   = $.boring.globals

class Core

  constructor: ( @$element, @controller ) ->
    if @controller.view then @$element.data( 'compose', 'controller' )
    @afterRender()

  afterRender: =>
    new Parser( @$element, @controller, false, @controller )

  checkForChanges: ->
    setTimeout =>
      for binding in globals.bindings
        binding.update()
      @cleanBindings()

  cleanBindings: ->
    count = globals.bindings.length
    for index in [ count - 1..0 ]
      binding = globals.bindings[ index ]
      element = binding.element or binding.$element.get( 0 )
      globals.bindings.splice( index, 1 ) unless $.contains( document.body, element )