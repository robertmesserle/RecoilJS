Base = $.boring.classes.Base

class $.boring.classes.AttributeBinding extends Base

  constructor: ( @attribute, @$element, @scope, @parent, @root  ) ->
    @binding = @$element.data @attribute
    @setValue()
    @pushBinding()

  setValue: ->
    value = @parseBinding @binding
    if @value isnt value
      @value = value
      @$element.attr @attribute, @value

  update: ->
    @setValue()
