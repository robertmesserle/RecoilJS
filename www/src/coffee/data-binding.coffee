define ( require ) ->

  SectionController = require './section-controller'
  Data = require './data/data-binding'

  class DataBindingController extends SectionController

    view: 'data-binding'
    category: 'Documentation'
    title: 'Data Binding'

    searchEnabled: true
    searchTerm: ''

    bindings: Data

    constructor: ->

    formatSyntax: ( binding ) ->
      syntax = binding.syntax
      for arg in binding.args or []
        syntax = syntax.replace arg.name, """<span class="blue">#{ arg.name }</span>"""
      syntax = syntax.replace( '#{', '#\\{' )
      return syntax

    search: =>
      return @bindings unless @searchTerm
      for binding in @bindings when @test binding then binding

    test: ( binding ) =>
      term = @searchTerm.toLowerCase()
      return true unless @searchTerm
      return true if binding.title.toLowerCase().match( term )
      for arg in binding.args or []
        return true if arg.name.toLowerCase().match term

    highlight: ( text ) =>
      return text unless @searchTerm
      regexString = @searchTerm.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" )
      regex = new RegExp( regexString, 'gi' )
      text.replace regex, ( match ) ->
        """<span class="highlight">#{ match }</span>"""
