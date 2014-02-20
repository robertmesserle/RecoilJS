Base = require( './base.coffee' )

class InitBinding extends Base

  constructor: ( @context  ) ->
    return unless @binding = @context.$element.data( 'init' )
    @csString = "-> #{ @binding }"
    @func = @parseBinding( @csString, false )
    @func.call( this )()
    super

module.exports = InitBinding
