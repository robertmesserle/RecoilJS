define ( require ) ->

  DocumentationController = require './reference'

  class RouterController extends DocumentationController

    title:  'Router'
    data:   require './data/router'