{ views, viewPath, transitions } = require '../shared.coffee'
Base = require './base.coffee'

class ComposeBinding extends Base

  constructor: ( @context ) ->
    return unless ( @binding = @context.$element.data 'compose' ) or @context.$element.data 'view'
    @context.skipChildren = true
    @bindings     = read: [], write: []
    @controller   = @parseBinding @binding if @binding
    @view         = @getView()
    @loadView() if @view
    super

  getView: ( controller = @controller ) ->
    view = @context.$element.data 'view'
    if view then return @parseBinding view
    controller?.view

  loadView: ->
    url = "#{ viewPath }/#{ @view }.html"
    if views[ url ]
      return @renderView views[ url ]
    @loading = true
    $.ajax url: url, success: ( data ) =>
      @loading = false
      data = views[ url ] = data
        .replace /<\$/g, '<div data-logic="true"'
        .replace /<\/\$>/g, '</div>'
      @renderView data

  renderView: ( data = @html ) =>
    @controller?.beforeRender? @context.$element, @context.parent, @context.root
    @context.$element.scrollTop 0
    @html     = data
    @bindings = read: [], write: []
    @insertHtml()
    @controller?.afterRender? @context.$element, @context.parent, @context.root
    intro = transitions.intro[ @view ] or @controller?.intro or null
    intro? @context.$element

  insertHtml: ->
    comment = $( '<!-- placeholder comment for compose binding -->' ).insertBefore @context.$element
    @context.$element.detach().html @html
    @parseChildren()
    comment.after( @context.$element ).remove()

  parseChildren: ->
    @context.$element.contents().each ( index, element ) =>
      extras = $.extend {}, @context.extras, parentBinding: this
      new shared.Parser $element: $( element ), scope: @controller, parent: @context.scope, root: @context.root, extras: extras

  update: ->
    return if @loading
    controller = @parseBinding @binding if @binding
    view       = @getView controller
    if @controller isnt controller or @view isnt view
      outro       = transitions.outro[ @view ] or @controller?.outro or null
      @controller = controller
      @view       = view
      callback    = => @loadView() if @view
      outro?( @context.$element, callback ) or callback()
    else
      @checkBindings()

module.exports = ComposeBinding
