class ComposeBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras ) ->
    @binding      = @$element.data( 'compose' )
    @controller   = @parseBinding @binding if @binding
    @view         = @$element.data( 'view' ) or @controller?.view
    @loadView()
    @pushBinding()

  loadView: ->
    url = "#{ Recoil.viewPath }/#{ @view }.html"
    if Recoil.views[ url ]
      return @renderView( Recoil.views[ url ] )
    $.ajax url: url, success: ( data ) =>
      data = Recoil.views[ url ] = data
        .replace( /<\$/g, '<div data-logic="true"' )
        .replace( /<\/\$>/g, '</div>' )
      @renderView( data )

  renderView: ( data = @html ) =>
    @html = data
    @$element.html( @html )
    @parseChildren()
    @controller?.afterRender? @$element, @parent, @root
    intro = Recoil.transitions.intro[ @view ] or @controller?.intro or null
    intro? @$element

  parseChildren: ->
    @$element.contents().each ( index, element ) =>
      new Parser( $( element ), @controller, @scope, @root, @extras )

  update: ->
    controller = @parseBinding @binding if @binding
    if @controller isnt controller
      callback = =>
        @controller = controller
        @view = @controller.view
        @loadView()
      outro = Recoil.transitions.outro[ @view ] or @controller?.outro or null
      outro?( @$element, callback ) or callback()