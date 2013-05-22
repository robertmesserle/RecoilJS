class VisibleBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras ) ->
    @binding = @$element.data( 'visible' )
    @setValue()
    @pushBinding()

  setValue: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      if @value then @$element.show()
      else @$element.hide()

  update: ->
    @setValue()
