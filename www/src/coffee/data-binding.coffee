define ( require ) ->

  DocumentationController = require './documentation'
  Data = require './data/data-binding'

  class DataBindingController extends DocumentationController

    title: 'Data Binding'
    bindings: Data