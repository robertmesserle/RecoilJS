define ( require ) ->

  globals           = require './globals'
  TextNode          = require './bindings/text-node'
  TextBinding       = require './bindings/text'
  AttributeBinding  = require './bindings/attribute'
  ForBinding        = require './bindings/for'
  EachBinding       = require './bindings/each'
  UpdateBinding     = require './bindings/update'
  ComposeBinding    = require './bindings/compose'
  ValueBinding      = require './bindings/value'
  IfBinding         = require './bindings/if'
  UnlessBinding     = require './bindings/unless'
  EventBinding      = require './bindings/event'
  CSSBinding        = require './bindings/css'
  HTMLBinding       = require './bindings/html'
  AttributeText     = require './bindings/attribute-text'

  class Parser

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
