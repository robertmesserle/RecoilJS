define ( require ) ->

  require './overrides'

  globals         = require './globals'
  Parser          = require './parser'
  ChangeParser    = require './change-parser'
  ComposeBinding  = require './bindings/compose'

  class Core

    constructor: ( @$element, @controller ) ->
      @$element.data( 'compose', 'controller' )
      @afterRender()

    afterRender: =>
      new Parser( @$element, this, false, @controller )

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