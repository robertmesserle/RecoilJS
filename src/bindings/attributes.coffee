Base = require( './base.coffee' )

class AttrBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'attr' )
    @setValue()
    super

  setValue: ->
    value = $.extend true, {}, @parseBinding @binding
    return unless @value isnt value
    if @value
      for key of @value
        @value[ key ] = ''
    @context.$element.attr $.extend true, @value or {}, value
    @value = value
    
  update: ->
    @setValue()

module.exports = AttrBinding
