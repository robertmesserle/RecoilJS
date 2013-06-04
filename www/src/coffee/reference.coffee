define ( require ) ->

  SectionController = require './section'

  class DataentryController extends SectionController

    view: 'reference'
    category: 'Reference'

    searchEnabled: true
    searchTerm: ''

    listStyle: 'list'

    handleListButton: ( $element, style ) =>
      if style is @listStyle
        $element.attr( 'disabled', true ).addClass( 'selected' )
      else
        $element.attr( 'disabled', false ).removeClass( 'selected' )

    highlightTerms: ( line, terms = [], highlight, escape = true ) =>
      for arg in terms
        if highlight then line = line.replace ":#{ arg.name }", """<span class="important">#{ arg.name }</span>"""
        else line = line.replace( ":#{ arg.name }", arg.name )
      line = line.replace( '#{', '#\\{' ) if escape
      return line

    formatSyntax: ( entry, highlight = true ) =>
      html = ''
      indent = lastIndent = 0
      for line in entry.syntax.split( /\n/g )
        indent = line.match( /^\s+/ )?[ 0 ]?.length or 0
        if indent > lastIndent then html += '<div class="block">'
        else if indent < lastIndent then html += '</div>'
        lastIndent = indent
        html += '<div>'
        html += @highlightTerms( line, entry.args, highlight )
        html += '</div>'
      html

    test: ( entry ) =>
      term = @searchTerm.toLowerCase()
      return true unless @searchTerm
      return true if entry.title.toLowerCase().match( term )
      return true if @highlightTerms( entry.syntax, entry.args, false ).toLowerCase().match( term )
      for arg in entry.args or []
        return true if arg.name.toLowerCase().match( term )

    highlight: ( text ) =>
      return text.replace( '#{', '#\\{' ) unless @searchTerm
      regexString = @searchTerm.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" )
      regex = new RegExp( regexString, 'gi' )
      newText = text.replace regex, ( match ) -> """<span class="highlight">#{ match }</span>"""
      return newText.replace( '#{', '#\\{' )
