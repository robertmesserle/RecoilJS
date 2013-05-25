class TextNode extends Base

  constructor: ( @context  ) ->
    @context.stopParsing = true
    @template = @context.$element.text()
    return unless @template.indexOf( '{' ) + 1
    @element = @context.$element.get( 0 )
    @updateValue()
    @pushBinding()

  updateValue: ->
    value = @parseString( @template )
    if @value isnt value
      @element.nodeValue = @value = value

  update: ->
    @updateValue()