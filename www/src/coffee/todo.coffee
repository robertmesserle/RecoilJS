define ( require ) ->

  SectionController = require './section-controller'

  class TodoController extends SectionController

    view: 'coming-soon'
    category: 'Tutorials'
    title: 'Todo App'

    constructor: ->