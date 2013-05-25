class Parser

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

    if $element.get( 0 ).nodeType is 3 then new TextNode context
    if $element.data( 'css' ) then new CSSBinding context
    if $element.data( 'visible' )? then new VisibleBinding context
    if $element.data( 'if' )? then new IfBinding context
    if $element.data( 'compose' ) or $element.data( 'view' ) then new ComposeBinding context
    if $element.data( 'for' ) then new ForBinding context
    if $element.data( 'html' ) then new HTMLBinding context
    if $element.data( 'value' ) then new ValueBinding context
    if $element.data( 'update' ) then new UpdateBinding context

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
