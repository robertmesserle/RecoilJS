class Parser

  bindings: [ TextNode, AttributeText, EventBinding, ContextBinding, CSSBinding, VisibleBinding, IfBinding, ComposeBinding, ForBinding, HTMLBinding, ValueBinding, UpdateBinding ]

  constructor: ( @context ) ->
    @context.$element.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    context = $element: $element, scope: @context.scope, parent: @context.parent, root: @context.root, extras: @context.extras
    context.$element = $element

    for binding in @bindings
      return if context.stopParsing
      new binding context

    return if context.skipChildren

    $contents = context.$contents or $element.contents()
    $contents.each ( index, element ) =>
      new Parser $.extend {}, context, context.childContext, $element: $( element )
