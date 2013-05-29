define ( require ) ->

  SectionController = require './section-controller'

  class DataBindingController extends SectionController

    view: 'documentation'
    category: 'Documentation'

    searchEnabled: true
    searchTerm: ''

    constructor: ->

    formatSyntax: ( binding ) ->
      syntax = binding.syntax
      for arg in binding.args or []
        syntax = syntax.replace arg.name, """<span class="blue">#{ arg.name }</span>"""
      syntax = syntax.replace( '#{', '#\\{' )
      return syntax

    test: ( binding ) =>
      term = @searchTerm.toLowerCase()
      return true unless @searchTerm
      return true if binding.title.toLowerCase().match( term )
      return true if binding.syntax.toLowerCase().match( term )
      for arg in binding.args or []
        return true if arg.name.toLowerCase().match( term )

    highlight: ( text ) =>
      return text.replace( '#{', '#\\{' ) unless @searchTerm
      regexString = @searchTerm.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" )
      regex = new RegExp( regexString, 'gi' )
      newText = text.replace regex, ( match ) -> """<span class="highlight">#{ match }</span>"""
      return newText.replace( '#{', '#\\{' )
