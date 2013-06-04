define ( require ) ->

  ContentController = require './content'

  class GettingStartedController extends ContentController

    category: 'Documentation'
    title: 'Getting Started'
    data: require './data/getting-started'

    parse: ( code ) ->
      lines = code.split( /\n/ )
      for line, index in lines
        lines[ index ] = line
          .replace( /^\s+/, ( match ) -> Array( match.length + 1 ).join( '&nbsp;' ) )
          .replace( /</g, '&lt;' )
          .replace( />/g, '&gt;' )
      lines.join( '<br />' )

    highlight: ( $element ) ->
      setTimeout -> hljs.highlightBlock $element.get( 0 ), null, true