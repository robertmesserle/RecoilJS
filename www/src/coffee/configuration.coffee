define ( require ) ->

  DocumentationController = require './reference'
  Data = require './data/configuration'

  class ConfigurationController extends DocumentationController

    title: 'Configuration'
    bindings: Data