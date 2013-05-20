define ( require ) ->

  globals = require './globals'
  Parser = require './parser'

  class ChangeParser

    constructor: ( $dom, @scope, @parent, @root ) ->
      $dom.each ( index, element ) =>
        $element = $( element )
        @parseNode( $element )

    parseNode: ( $element ) ->
      parseChildren = true
      @checkAttributes( $element )

    