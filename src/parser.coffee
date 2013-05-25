class Parser

  bindings: [ TextNode, AttributeText, EventBinding, ContextBinding, CSSBinding, VisibleBinding, IfBinding, ComposeBinding, ForBinding, HTMLBinding, ValueBinding, UpdateBinding ]

  constructor: ( @context ) ->
    @context.$element.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    context = $.extend {}, @context
    context.$element = $element

    for binding in @bindings
      new binding context
      break if context.skipBindings

    return if context.stopParsing

    $contents = context.$contents or $element.contents()
    $contents.each ( index, element ) =>
      new Parser $.extend {}, context, context.childContext, $element: $( element )
