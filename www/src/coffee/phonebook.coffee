define ( require ) ->

  SectionController = require './section'

  class PhonebookController extends SectionController

    view: 'coming-soon'
    category: 'Tutorials'
    title: 'Phonebook'

    constructor: ->