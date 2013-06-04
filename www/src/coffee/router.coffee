define ( require ) ->

  ReferenceController = require './reference'

  class RouterController extends ReferenceController

    title:  'Router'
    data:   require './data/router'