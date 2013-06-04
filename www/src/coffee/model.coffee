define ( require ) ->

  DocumentationController = require './reference'
  Data = require './data/model'

  class ModelController extends DocumentationController

    title: 'Model'
    bindings: Data