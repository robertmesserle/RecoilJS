Base     = require './base.coffee'
Compiler = require '../compiler.coffee'

class InitBinding extends Base

  constructor: ( @context  ) ->
    return unless @binding = @context.$element.data 'init'
    @func = @parseBinding Compiler.getFunction( @binding ), false
    @func.call( this )()
    super

module.exports = InitBinding
