class UpdateBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras  ) ->
    binding = @$element.data( 'update' )
    csString = "-> #{ binding }"
    @func = @parseBinding( csString )
    @func()
    @pushBinding()

  update: ->
    @func()