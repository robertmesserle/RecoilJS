define ( require ) ->

  SectionController = require './section'

  class GettingStartedController extends SectionController

    view: 'getting-started'
    category: 'Tutorials'
    title: 'Getting Started'

    constructor: ->