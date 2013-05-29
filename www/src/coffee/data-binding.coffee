define ( require ) ->

  SectionController = require './section-controller'
  Data = require './data/data-binding'

  class DataBindingController extends SectionController

    view: 'data-binding'
    category: 'Documentation'
    title: 'Data Binding'

    searchTerm: ''

    bindings: Data

    constructor: ->

    formatSyntax: ( binding ) ->
      syntax = binding.syntax
      for arg in binding.args or []
        syntax = syntax.replace arg.name, """<span class="blue">#{ arg.name }</span>"""
      syntax = syntax.replace( '#{', '#\\{' )
      return syntax