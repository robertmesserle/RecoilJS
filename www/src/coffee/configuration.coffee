define ( require ) ->

  ReferenceController = require './reference'

  class ConfigurationController extends ReferenceController

    title:  'Configuration'
    data:   require './data/configuration'