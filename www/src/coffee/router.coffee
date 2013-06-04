define ( require ) ->

  DocumentationController = require './reference'
  Data = require './data/router'

  class RouterController extends DocumentationController

    title: 'Router'
    bindings: Data