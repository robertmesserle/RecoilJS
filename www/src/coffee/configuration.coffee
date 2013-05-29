define ( require ) ->

  SectionController = require './section-controller'

  class ConfigurationController extends SectionController

    view: 'configuration'
    category: 'Documentation'
    title: 'Configuration'

    constructor: ->