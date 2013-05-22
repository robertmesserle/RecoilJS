class TextNode extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras  ) ->
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