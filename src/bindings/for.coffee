class ForBinding extends Base

  constructor: ( @context ) ->
    @context.stopParsing = true
    @binding          = @context.$element.data( 'for' )
    @parts            = @binding.split( ' in ' )
    @itemName         = $.trim @parts[ 0 ]
    @collectionName   = $.trim @parts[ 1 ]
    @getTemplate()
    @parseItems()
    super

  getTemplate: ->
    @$template = @context.$element.contents().remove()

  getCollection: ->
    items = @parseBinding @collectionName
    if typeof items is 'function' then items()
    else items

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
      # Update context for future parsing
      new Parser $element: $item, scope: @context.scope, parent: @context.parent, root: @context.root, extras: extras

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
    @context.$element.empty()
    @parseItems( collection )
    @unwrap() if @logic

  update: ->
    @updateItems()