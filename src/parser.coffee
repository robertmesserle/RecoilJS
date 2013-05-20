AttributeText     = $.boring.classes.AttributeText
AttributeBinding  = $.boring.classes.AttributeBinding
ComposeBinding    = $.boring.classes.ComposeBinding
CSSBinding        = $.boring.classes.CSSBinding
EachBinding       = $.boring.classes.EachBinding
EventBinding      = $.boring.classes.EventBinding
ForBinding        = $.boring.classes.ForBinding
IfBinding         = $.boring.classes.IfBinding
TextNode          = $.boring.classes.TextNode
TextBinding       = $.boring.classes.TextBinding
UnlessBinding     = $.boring.classes.UnlessBinding
UpdateBinding     = $.boring.classes.UpdateBinding
ValueBinding      = $.boring.classes.ValueBinding

$.boring.classes.Parser = class Parser

  constructor: ( $dom, @scope, @parent, @root ) ->
    $dom.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    parseChildren = true
    @attachEvents( $element )
    @parseAttributes( $element )
    if $element.get( 0 ).nodeType is 3
      new TextNode( $element, @scope, @parent, @root )
      return
    if $element.data( 'css' )
      new CSSBinding( $element, @scope, @parent, @root )
    if $element.data( 'if' )?
      parseChildren = false
      new IfBinding $element, @scope, @parent, @root, ( $element ) =>
        new Parser( $element, @scope, @parent, @root )
    if $element.data( 'unless' )?
      parseChildren = false
      new UnlessBinding $element, @scope, @parent, @root, ( $element ) =>
        new Parser( $element, @scope, @parent, @root )
    if $element.data( 'compose' )
      parseChildren = false
      new ComposeBinding $element, @scope, @parent, @root, ( $element, scope, parent, root ) =>
        new Parser( $element, scope, parent, root )
    if $element.data( 'for' )
      parseChildren = false
      new ForBinding $element, @scope, @parent, @root, ( $element, scope, parent, root ) =>
        new Parser( $element, scope, parent, root )
    if $element.data( 'each' )
      parseChildren = false
      new EachBinding $element, @scope, @parent, @root, ( $element, scope, parent, root ) =>
        new Parser( $element, scope, parent, root )
    if $element.data( 'text' )
      parseChildren = false
      new TextBinding( $element, @scope, @parent, @root )
    if $element.data( 'html' )
      new HTMLBinding( $element, @scope, @parent, @root )
    if $element.data( 'value' )
      parseChildren = false
      new ValueBinding( $element, @scope, @parent, @root )
    if $element.data( 'update' )
      new UpdateBinding( $element, @scope, @parent, @root )

    return unless parseChildren

    $element.contents().each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseAttributes: ( $element ) ->
    # Data-Attributes
    for attribute in globals.attributes
      str = $element.data( attribute )
      continue unless str
      new AttributeBinding( attribute, $element, @scope, @parent, @root )
    # Attributes
    for attribute in $element.get( 0 ).attributes or []
      new AttributeText( attribute, $element, @scope, @parent, @root )

  attachEvents: ( $element ) ->
    for event in globals.events
      str = $element.data( event )
      continue unless str
      new EventBinding( event, $element, @scope, @parent, @root )

  parseString: ( str ) ->
    # Split string into parts
    parts = str.split( '.' )
    # Determine scope
    switch parts[ 0 ]
      when '$root'
        scope = @root
        parts.shift()
      when '$parent'
        scope = @parent
        parts.shift()
      when '$data'
        scope = @scope
        parts.shift()
      else
        scope = @scope
    # Drill down through scope
    value = scope
    for part in parts
      value = value[ part ]
    # Return drilled-down scope
    return value
