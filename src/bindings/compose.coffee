class ComposeBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras ) ->
    @binding      = @$element.data( 'compose' )
    @controller   = @parseBinding @binding
    @view         = @controller?.view
    @loadView()
    @pushBinding()

  loadView: ->
    url = "#{ Recoil.viewPath }/#{ @view }.html"
    if Recoil.views[ url ]
      return @renderView( Recoil.views[ url ] )
    $.ajax url: url, success: ( data ) =>
      data = Recoil.views[ url ] = Recoil.stripLogicTags( data )
      @renderView( data )

  renderView: ( data = @html ) =>
    @html = data
    @$element.html( @html )
    @parseChildren()
    @controller.afterRender? {
      $dom:   @$element
      scope:  @scope
      parent: @parent
      root:   @root
    }
    intro = Recoil.transitions.intro[ @view ] or @controller?.intro or null
    intro? @$element

  parseChildren: ->
    @$element.contents().each ( index, element ) =>
      new Parser( $( element ), @controller, @scope, @root, @extras )

  update: ->
    controller = @parseBinding @binding
    if @controller isnt controller
      callback = =>
        @controller = controller
        @view = @controller.view
        @loadView()
      outro = Recoil.transitions.outro[ @view ] or @controller?.outro or null
      outro?( @$element, callback ) or callback()