define ( require ) ->

  DocumentationController = require './reference'

  class ModelController extends DocumentationController

    title:  'Model'
    data:   require './data/model'