define ( require ) ->

  SectionController = require './section-controller'

  class HomeController extends SectionController

    view: 'home'
    category: 'About'
    title: 'Home'

    constructor: ->