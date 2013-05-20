define ( require ) ->

  globals = require './globals'

  class Transition

    constructor: ( @type, @id, @callback ) ->
      globals.transitions[ @type ][ @id ] = @callback