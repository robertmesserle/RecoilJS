class HTMLBinding extends Base

  constructor: ( @$element, @scope, @parent, @root  ) ->
    @binding = @$element.data( 'html' )
    @setValue()
    @pushBinding()

  setValue: ->
    value = @parseBinding @binding
    if @value isnt value
      @value = value
      @$element.html @value

  update: ->
    @setValue()