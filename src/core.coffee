class Core

  constructor: ( @$element, @controller ) ->
    @checkForLogicTags()
    @addComposition()

  checkForLogicTags: ->
    html = @$element.html()
    return unless html.indexOf( '&lt;$' ) + 1
    html = html.replace /&lt;\$(.*)&gt;/g, ( match, contents ) -> "<div data-logic #{ contents }>"
    html = html.replace /<!--\$-->/g, '</div>'
    @$element.html html

  addComposition: =>
    if @controller.view
      @$element.data( 'compose', '$scope' )
    new Parser $element: @$element, scope: @controller, root: @controller