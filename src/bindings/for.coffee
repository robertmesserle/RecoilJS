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
    items = for item in items when @conditionFunction.call( this, item ) then item

  parseItems: ( collection = @getCollection() ) ->
    for item, index in collection
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