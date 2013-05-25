class UpdateBinding extends Base

  constructor: ( @context  ) ->
    return unless binding = @context.$element.data( 'update' )
    csString = "-> #{ binding }"
    @func = @parseBinding( csString )
    @func()
    super

  update: ->
    @func()