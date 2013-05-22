class EachBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras, @childParser ) ->
    @binding = @$element.data( 'each' )
    @getTemplate()
    @parseItems()
    super

  getTemplate: ->
    @$template = @$element.contents().remove()

  getItems: ->
    items = @parseBinding @binding
    if typeof items is 'function' then items()
    else items

  parseItems: ( items = @getItems() ) ->
    for item, index in collection
      $item   = @$template.clone().appendTo( @$element )
      extras  = $.extend {}, @extras
      if typeof item is 'object'
        extras[ @itemName ].$index = index
        extras[ @itemName ].$total = collection.length
      @childParser( $item, item, @scope, @root, extras )

  checkForChanges: ( collection ) =>
    return true unless @collection
    return true unless collection.length is @collection.length
    for item, index in collection or []
      return true unless item is @collection[ index ]
    return false

  updateItems: ->
    collection = @getCollection()
    return unless @checkForChanges( collection )
    @collection = collection.slice( 0 )
    @wrap() if @logic
    @$element.empty()
    @parseItems( collection )
    @unwrap() if @logic

  update: ->
    @updateItems()