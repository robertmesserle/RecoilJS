class UpdateBinding extends Base

  constructor: ( @context  ) ->
    binding = @context.$element.data( 'update' )
    csString = "-> #{ binding }"
    @func = @parseBinding( csString )
    @func()
    @pushBinding()

  update: ->
    @func()