define ( require ) ->

  DocumentationController = require './documentation'
  Data = require './data/router'

  class RouterController extends DocumentationController

    title: 'Data Binding'
    bindings: Data