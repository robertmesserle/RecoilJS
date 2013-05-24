class Core

  constructor: ( @$element, @controller ) ->
    @checkForLogicTags()
    @afterRender()

  checkForLogicTags: ->
    html = @$element.html()
    return unless html.indexOf( '&lt;$' ) + 1
    html = html.replace /&lt;\$(.*)&gt;/g, ( match, contents ) -> "<div data-logic #{ contents }>"
    html = html.replace /<!--\$-->/g, '</div>'
    @$element.html html

  afterRender: =>
    if @controller.view
      @$element.data( 'compose', '$scope' )
    new Parser( @$element, @controller, false, @controller )

  checkForChanges: ->
    Recoil.setTimeout =>
      for binding in Recoil.bindings
        binding.update()
      @cleanBindings()

  cleanBindings: ->
    count = Recoil.bindings.length
    for index in [ count - 1..0 ]
      binding = Recoil.bindings[ index ]
      element = binding.$placeholder?.get( 0 ) or binding.$element?.get( 0 )
      Recoil.bindings.splice( index, 1 ) unless $.contains( document.body, element )