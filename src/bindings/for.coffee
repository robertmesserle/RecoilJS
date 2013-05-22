class ForBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @childParser ) ->
    @binding          = @$element.data( 'for' )
    @parts            = @binding.split( 'in' )
    @itemName         = $.trim @parts[ 0 ]
    @collectionName   = $.trim @parts[ 1 ]
    @getTemplate()
    @parseItems()
    super

  getTemplate: ->
    @$template = @$element.contents().remove()

  getCollection: ->
    items = @parseBinding @collectionName
    items?() or items

  parseItems: ( collection = @getCollection() ) ->
    @collection = JSON.stringify( collection )
    for item, index in collection
      $item   = @$template.clone().appendTo( @$element )
      scope   = $.extend {}, @scope
      if typeof item is 'object'
        scope[ @itemName ] = item
        scope[ @itemName ].$index = index
        scope[ @itemName ].$total = collection.length
      else
        scope[ @itemName ] = item
      @childParser( $item, scope, @parent, @root )

  updateItems: ->
    collection = @getCollection()
    collectionString = JSON.stringify( collection )
    return if @collection is collectionString
    @collection = collectionString
    @wrap() if @logic
    @$element.empty()
    @parseItems( collection )
    @unwrap() if @logic

  update: ->
    @updateItems()