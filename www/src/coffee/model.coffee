define ( require ) ->

  DocumentationController = require './documentation'
  Data = require './data/model'

  class ModelController extends DocumentationController

    title: 'Model'
    bindings: Data