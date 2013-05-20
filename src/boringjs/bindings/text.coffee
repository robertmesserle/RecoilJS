define ( require ) ->

  Base = require './base'

  class TextBinding extends Base

    constructor: ( @$element, @scope, @parent, @root  ) ->
      @binding = @$element.data( 'text' )
      @setValue()
      @pushBinding()

    setValue: ->
      value = @parseBinding @binding
      if @value isnt value
        @value = value
        @$element.text @value

    update: ->
      @setValue()