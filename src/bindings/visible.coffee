Base = require( './base.coffee' )

class VisibleBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'visible' )
    @setValue()
    super

  setValue: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      if @value then @context.$element.show()
      else @context.$element.hide()

  update: ->
    @setValue()

module.exports = VisibleBinding
