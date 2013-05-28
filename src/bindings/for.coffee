class ForBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'for' )
    @context.stopParsing = true
    @getParts()
    @getTemplate()
    @parseItems()
    super

  getParts: ->
    parts               = @binding.split /\s+in\s+|\s+when\s+/g
    itemParts           = parts[ 0 ].split( ',' )
    @itemName           = $.trim itemParts[ 0 ]
    @indexName          = $.trim itemParts[ 1 ]
    @collectionName     = $.trim parts[ 1 ]
    condition           = $.trim parts[ 2 ] or 'true'
    @conditionFunction  = @parseBinding( condition, false )

  getTemplate: ->
    @$template = @context.$element.contents().remove()

  getCollection: ->
    items = @parseBinding @collectionName
    items = if typeof items is 'function' then items() else items
    if items instanceof Array
      items = for item, index in items when @conditionFunction.call( this, item, index ) then item
    else
      for item, key of items when not @conditionFunction.call( this, item, key )
        delete items[ key ]
    items

  parseItems: ( collection = @getCollection() ) ->
    if collection instanceof Array
      for item, index in collection then @parseItem item, index, collection
    else
      for index, item of collection then @parseItem item, index, collection

  parseItem: ( item, index, collection ) ->
    $item   = @$template.clone().appendTo( @context.$element )
    extras  = $.extend {}, @context.extras
    if typeof item is 'object'
      extras.itemName             = @itemName
      extras.$item                = item
      extras[ @itemName ]         = item
      extras[ @itemName ].$index  = index
      extras[ @itemName ].$total  = collection.length
    else
      extras[ @itemName ]         = item
    if @indexName
      extras[ @indexName ]        = index
    DirtyCheck.cleanBindings()
    new Parser $element: $item, scope: @context.scope, parent: @context.parent, root: @context.root, extras: extras

  generateFunction: ( str ) ->
    args = [ @itemName ]
    if @indexName then args.push @indexName
    super str, args

  checkForChanges: ( collection ) =>
    return true
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
    @context.$element.empty()
    @parseItems( collection )
    @unwrap() if @logic

  update: ->
    @updateItems()