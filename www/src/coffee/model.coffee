define ( require ) ->

  ReferenceController = require './reference'

  class ModelController extends ReferenceController

    title:  'Model'
    data:   require './data/model'