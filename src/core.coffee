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