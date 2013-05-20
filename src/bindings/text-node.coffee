Base = $.boring.classes.Base

class $.boring.classes.TextNode extends Base

  constructor: ( @$element, @scope, @parent, @root  ) ->
    @template = @$element.text()
    return unless @template.indexOf( '{' ) + 1
    @element = @$element.get( 0 )
    @updateValue()
    @pushBinding()

  updateValue: ->
    value = @parseString( @template )
    if @value isnt value
      @element.nodeValue = @value = value

  update: ->
    @updateValue()