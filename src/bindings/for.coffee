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
    ( items?() or items ).slice( 0 )

  parseItems: ( @collection = @getCollection( collection ) ) ->
    for item, index in @collection
      $item   = @$template.clone().appendTo( @$element )
      scope   = $.extend {}, @scope
      if typeof item is 'object'
        scope[ @itemName ] = $.extend {}, item 
        scope[ @itemName ].$index = index
        scope[ @itemName ].$total = @collection.length
      else
        scope[ @itemName ] = item
      @childParser( $item, scope, @parent, @root )

  updateItems: ->
    collection = @getCollection()
    return if @collection is collection
    return if JSON.stringify( @collection ) is JSON.stringify( collection )
    @wrap() if @logic
    @$element.empty()
    @parseItems( collection )
    @unwrap() if @logic

  update: ->
    @updateItems()