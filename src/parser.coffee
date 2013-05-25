class Parser

  bindings: [ TextNode, ContextBinding, CSSBinding, VisibleBinding, IfBinding, ComposeBinding, ForBinding, HTMLBinding, ValueBinding, UpdateBinding ]

  constructor: ( @context ) ->
    @context.$element.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    context = $.extend {}, @context
    context.$element = $element
    parseChildren = true
    @attachEvents( $element )
    @parseAttributes( $element )

    for binding in @bindings
      new binding context
      break if context.skipBindings

    return if context.stopParsing

    $contents = context.$contents or $element.contents()
    $contents.each ( index, element ) =>
      new Parser $.extend {}, context, context.childContext, $element: $( element )

  parseAttributes: ( $element ) ->
    for attribute in $element.get( 0 ).attributes or []
      new AttributeText( attribute, @context )

  attachEvents: ( $element ) ->
    for event in Recoil.events
      str = $element.data( event )
      continue unless str
      new EventBinding( event, @context )
