class ComposeBinding extends Base

  constructor: ( @context ) ->
    return unless ( @binding = @context.$element.data( 'compose' ) ) or @context.$element.data( 'view' )
    @context.skipChildren = true
    @bindings     = read: [], write: []
    @controller   = @parseBinding @binding if @binding
    @view         = @getView()
    @loadView() if @view
    super

  getView: ( controller = @controller ) ->
    view = @context.$element.data( 'view' )
    if view then return @parseBinding( view )
    controller?.view

  loadView: ->
    url = "#{ Recoil.viewPath }/#{ @view }.html"
    if Recoil.views[ url ]
      return @renderView( Recoil.views[ url ] )
    @loading = true
    $.ajax url: url, success: ( data ) =>
      @loading = false
      data = Recoil.views[ url ] = data
        .replace( /<\$/g, '<div data-logic="true"' )
        .replace( /<\/\$>/g, '</div>' )
      @renderView( data )

  renderView: ( data = @html ) =>
    @controller?.beforeRender? @context.$element, @context.parent, @context.root
    @html = data
    @context.$element.scrollTop( 0 )
    @bindings = read: [], write: []
    $comment = $( '<!-- placeholder for compose binding -->' ).insertAfter( @context.$element )
    @context.$element.detach().html( @html )
    @parseChildren()
    @context.$element.insertBefore( $comment )
    @controller?.afterRender? @context.$element, @context.parent, @context.root
    intro = Recoil.transitions.intro[ @view ] or @controller?.intro or null
    intro? @context.$element

  parseChildren: ->
    @context.$element.contents().each ( index, element ) =>
      extras = $.extend {}, @context.extras, parentBinding: this
      new Parser( $element: $( element ), scope: @controller, parent: @context.scope, root: @context.root, extras: extras )

  update: ->
    return if @loading
    controller = @parseBinding @binding if @binding
    view = @getView( controller )
    if @controller isnt controller or @view isnt view
      outro = Recoil.transitions.outro[ @view ] or @controller?.outro or null
      @controller = controller
      @view = view
      callback = => @loadView() if @view
      outro?( @context.$element, callback ) or callback()
    else
      @checkBindings()
