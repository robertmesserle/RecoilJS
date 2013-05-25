class VisibleBinding extends Base

  constructor: ( @context ) ->
    @binding = @context.$element.data( 'visible' )
    @setValue()
    @pushBinding()

  setValue: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      if @value then @context.$element.show()
      else @context.$element.hide()

  update: ->
    @setValue()
