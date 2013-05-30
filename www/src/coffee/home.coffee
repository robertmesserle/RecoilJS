define ( require ) ->

  SectionController = require './section'

  class HomeController extends SectionController

    view: 'home'
    category: 'About'
    title: 'Home'

    constructor: ->