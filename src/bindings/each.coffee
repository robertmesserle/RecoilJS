class EachBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @childParser ) ->
    @binding = @$element.data( 'each' )
    @getTemplate()
    @parseItems()
    super

  getTemplate: ->
    @$template = @$element.contents().remove()

  getItems: ->
    items = @parseBinding @binding
    items?() or items

  parseItems: ( items = @getItems() ) ->
    for item, index in @items
      $item         = @$template.clone().appendTo( @$element )
      scope         = $.extend( {}, @scope )
      scope.$index  = index
      scope.$total  = @items.length
      @childParser( $item, item, @scope, @root )

  updateItems: ->
    items = @getItems()
    itemsString = JSON.stringify( items )
    return if @items is itemsString
    @items = itemsString
    @wrap() if @logic
    @$element.empty()
    @parseItems( items )
    @unwrap() if @logic

  update: ->
    @updateItems()