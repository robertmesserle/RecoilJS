class Parser

  constructor: ( $dom, @scope = {}, @parent = {}, @root = {}, @extras = {} ) ->
    @splat = [ @scope, @parent, @root, @extras ]
    $dom.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    parseChildren = true
    @attachEvents( $element )
    @parseAttributes( $element )
    if $element.get( 0 ).nodeType is 3
      new TextNode( $element, @splat... )
      return
    if $element.data( 'css' )
      new CSSBinding $element, @splat...
    if $element.data( 'visible' )?
      new VisibleBinding $element, @splat...
    if $element.data( 'if' )?
      parseChildren = false
      new IfBinding $element, @splat...
    if $element.data( 'compose' )
      parseChildren = false
      new ComposeBinding $element, @splat...
    if $element.data( 'for' )
      parseChildren = false
      new ForBinding $element, @splat...
    if $element.data( 'html' )
      new HTMLBinding $element, @splat...
    if $element.data( 'value' )
      parseChildren = false
      new ValueBinding $element, @splat...
    if $element.data( 'update' )
      new UpdateBinding $element, @splat...

    return unless parseChildren

    $element.contents().each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseAttributes: ( $element ) ->
    for attribute in $element.get( 0 ).attributes or []
      new AttributeText( attribute, $element, @splat... )

  attachEvents: ( $element ) ->
    for event in Recoil.events
      str = $element.data( event )
      continue unless str
      new EventBinding( event, $element, @splat... )

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
