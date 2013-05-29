class ComposeBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'compose' )
    @controller   = @parseBinding @binding if @binding
    @view         = @context.$element.data( 'view' ) or @controller?.view
    @loadView()
    super

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
    @context.$element.html( @html )
    DirtyCheck.cleanBindings()
    @parseChildren()
    @controller?.afterRender? @context.$element, @context.parent, @context.root
    intro = Recoil.transitions.intro[ @view ] or @controller?.intro or null
    intro? @context.$element

  parseChildren: ->
    @context.$element.contents().each ( index, element ) =>
      new Parser( $element: $( element ), scope: @controller, parent: @context.scope, root: @context.root, extras: @context.extras )

  update: ->
    controller = @parseBinding @binding if @binding
    view = @context.$element.data( 'view' ) or controller?.view
    if @controller isnt controller or @view isnt view
      @controller = controller
      @view = view
      callback = => @loadView()
      outro = Recoil.transitions.outro[ @view ] or @controller?.outro or null
      outro?( @context.$element, callback ) or callback()