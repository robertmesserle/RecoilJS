define ( require ) ->

  SectionController = require './section-controller'

  class DataBindingController extends SectionController

    view: 'data-binding'
    category: 'Documentation'
    title: 'Data Binding'

    constructor: ->