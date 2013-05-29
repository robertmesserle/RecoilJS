class TextNode extends Base

  constructor: ( @context  ) ->
    return unless @context.$element.get( 0 ).nodeType is 3
    return unless @template = @context.$element.text()
    return unless @template.indexOf( '{' ) + 1
    @context.stopParsing   = true
    @element               = @context.$element.get( 0 )
    @updateValue()
    super

  updateValue: ->
    value = @parseString( @template )
    if @value isnt value
      @element.nodeValue = @value = value

  update: ->
    @updateValue()