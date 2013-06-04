define ( require ) ->

  ReferenceController = require './reference'

  class DataBindingController extends ReferenceController

    title:  'Data Binding'
    data:   require './data/data-binding'