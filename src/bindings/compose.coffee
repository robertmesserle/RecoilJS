class ComposeBinding extends Base

  constructor: ( @$element, @scope, @parent, @root = @scope, @childParser ) ->
    @binding      = @$element.data( 'compose' )
    @controller   = @parseBinding @binding
    @view         = @controller?.view
    @loadView()
    @pushBinding()

  loadView: ->
    url = "/views/#{ @view }.html"
    if globals.views[ url ]
      return @renderView( globals.views[ url ] )
    $.ajax url: url, success: ( data ) =>
      data = globals.views[ url ] = data
        .replace( /<\$/g, '<div data-logic="true"' )
        .replace( /<\/\$>/g, '</div>' )
      @renderView( data )

  renderView: ( data = @html ) =>
    @html = data
    @$element.html( @html )
    @childParser( @$element.children(), @controller, @scope, @root )
    @controller.afterRender?(
      $dom:   @$element
      scope:  @scope
      parent: @parent
      root:   @root
    )
    intro = globals.transitions.intro[ @view ] or @controller?.intro or null
    intro?( @$element )

  update: ->
    controller = @parseBinding @binding
    if @controller isnt controller
      callback = =>
        @controller = controller
        @view = @controller.view
        @loadView()
      outro = globals.transitions.outro[ @view ] or @controller?.outro or null
      outro?( @$element, callback ) or callback()