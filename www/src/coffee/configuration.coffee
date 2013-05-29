define ( require ) ->

  DocumentationController = require './documentation'
  Data = require './data/configuration'

  class ConfigurationController extends DocumentationController

    title: 'Configuration'
    bindings: Data