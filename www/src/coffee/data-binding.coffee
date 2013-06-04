define ( require ) ->

  DocumentationController = require './reference'
  Data = require './data/data-binding'

  class DataBindingController extends DocumentationController

    title: 'Data Binding'
    bindings: Data