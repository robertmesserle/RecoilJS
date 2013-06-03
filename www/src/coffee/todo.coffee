define ( require ) ->

  SectionController = require './section'

  class TodoController extends SectionController

    view: 'todo'
    category: 'Tutorials'
    title: 'Todo App'

    constructor: ->