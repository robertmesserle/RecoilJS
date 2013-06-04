define ( require ) ->

  DocumentationController = require './reference'

  class ConfigurationController extends DocumentationController

    title:  'Configuration'
    data:   require './data/configuration'