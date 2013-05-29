define ( require ) ->

  SectionController = require './section-controller'

  class PhonebookController extends SectionController

    view: 'coming-soon'
    category: 'Tutorials'
    title: 'Phonebook'

    constructor: ->