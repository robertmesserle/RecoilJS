define ( require ) ->

  DocumentationController = require './reference'

  class DataBindingController extends DocumentationController

    title:  'Data Binding'
    data:   require './data/data-binding'