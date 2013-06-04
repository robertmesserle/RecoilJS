define ( require ) ->

  SectionController = require './section'

  class GettingStartedController extends SectionController

    view: 'getting-started'
    category: 'Documentation'
    title: 'Getting Started'

    constructor: ->