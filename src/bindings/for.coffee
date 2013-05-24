class ForBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras ) ->
    @binding          = @$element.data( 'for' )
    @parts            = @binding.split( ' in ' )
    @itemName         = $.trim @parts[ 0 ]
    @collectionName   = $.trim @parts[ 1 ]
    @getTemplate()
    @parseItems()
    super

  getTemplate: ->
    @$template = @$element.contents().remove()

  getCollection: ->
    items = @parseBinding @collectionName
    if typeof items is 'function' then items()
    else items

  parseItems: ( collection = @getCollection() ) ->
    for item, index in collection
      $item   = @$template.clone().appendTo( @$element )
      extras  = $.extend {}, @extras
      if typeof item is 'object'
        extras.itemName             = @itemName
        extras.$item                = item
        extras[ @itemName ]         = item
        extras[ @itemName ].$index  = index
        extras[ @itemName ].$total  = collection.length
      else
        extras[ @itemName ] = item
      new Parser( $item, @scope, @parent, @root, extras )

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