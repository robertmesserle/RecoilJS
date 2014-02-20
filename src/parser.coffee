shared         = require( './shared.coffee' )
TextNode       = require( './bindings/text-node.coffee' )
IfBinding      = require( './bindings/if.coffee' )
AttributeText  = require( './bindings/attribute-text.coffee' )
EventBinding   = require( './bindings/event.coffee' )
AttrBinding    = require( './bindings/attributes.coffee' )
ContextBinding = require( './bindings/context.coffee' )
CSSBinding     = require( './bindings/css.coffee' )
VisibleBinding = require( './bindings/visible.coffee' )
ComposeBinding = require( './bindings/compose.coffee' )
ForBinding     = require( './bindings/for.coffee' )
HTMLBinding    = require( './bindings/html.coffee' )
ValueBinding   = require( './bindings/value.coffee' )
UpdateBinding  = require( './bindings/update.coffee' )
InitBinding    = require( './bindings/init.coffee' )

class Parser

  bindings: [ TextNode, IfBinding, AttributeText, EventBinding, AttrBinding, ContextBinding, CSSBinding, VisibleBinding, ComposeBinding, ForBinding, HTMLBinding, ValueBinding ]

  constructor: ( @context ) ->
    @context.$element.each ( index, element ) =>
      $element = $( element )
      @parseNode( $element )

  parseNode: ( $element ) ->
    context = $element: $element, scope: @context.scope, parent: @context.parent, root: @context.root, extras: @context.extras

    for binding in @bindings
      return if context.stopParsing
      new binding context

    return if context.skipChildren

    $contents = context.$contents or $element.contents()
    $contents.each ( index, element ) =>
      new Parser $.extend {}, context, context.childContext, $element: $( element )

    new UpdateBinding context
    new InitBinding   context

shared.Parser  = Parser
module.exports = Parser
