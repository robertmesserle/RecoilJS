define ( require ) ->

  Base = require './base'

  class UpdateBinding extends Base

    constructor: ( @$element, @scope, @parent, @root  ) ->
      binding = @$element.data( 'update' )
      csString = "-> #{ binding }"
      @func = @parseBinding( csString )
      @func()
      @pushBinding()

    update: ->
      @func()