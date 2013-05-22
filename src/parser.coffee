class Parser

  constructor: ( $dom, @scope = {}, @parent = {}, @root = {}, @extras = {} ) ->
    $dom.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    parseChildren = true
    @attachEvents( $element )
    @parseAttributes( $element )
    if $element.get( 0 ).nodeType is 3
      new TextNode( $element, @scope, @parent, @root, @extras )
      return
    if $element.data( 'css' )
      new CSSBinding( $element, @scope, @parent, @root, @extras )
    if $element.data( 'visible' )?
      new VisibleBinding( $element, @scope, @parent, @root, @extras )
    if $element.data( 'if' )?
      parseChildren = false
      new IfBinding $element, @scope, @parent, @root, @extras, ( $element ) =>
        new Parser( $element, @scope, @parent, @root, @extras )
    if $element.data( 'unless' )?
      parseChildren = false
      new UnlessBinding $element, @scope, @parent, @root, @extras, ( $element ) =>
        new Parser( $element, @scope, @parent, @root, @extras )
    if $element.data( 'compose' )
      parseChildren = false
      new ComposeBinding $element, @scope, @parent, @root, @extras, ( $element, scope, parent, root, extras ) =>
        new Parser( $element, scope, parent, root, extras )
    if $element.data( 'for' )
      parseChildren = false
      new ForBinding $element, @scope, @parent, @root, @extras, ( $element, scope, parent, root, extras ) =>
        new Parser( $element, scope, parent, root, extras )
    if $element.data( 'text' )
      parseChildren = false
      new TextBinding( $element, @scope, @parent, @root, @extras )
    if $element.data( 'html' )
      new HTMLBinding( $element, @scope, @parent, @root, @extras )
    if $element.data( 'value' )
      parseChildren = false
      new ValueBinding( $element, @scope, @parent, @root, @extras )
    if $element.data( 'update' )
      new UpdateBinding( $element, @scope, @parent, @root, @extras )

    return unless parseChildren

    $element.contents().each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseAttributes: ( $element ) ->
    # Data-Attributes
    for attribute in Recoil.attributes
      str = $element.data( attribute )
      continue unless str
      new AttributeBinding( attribute, $element, @scope, @parent, @root, @extras )
    # Attributes
    for attribute in $element.get( 0 ).attributes or []
      new AttributeText( attribute, $element, @scope, @parent, @root, @extras )

  attachEvents: ( $element ) ->
    for event in Recoil.events
      str = $element.data( event )
      continue unless str
      new EventBinding( event, $element, @scope, @parent, @root, @extras )

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
