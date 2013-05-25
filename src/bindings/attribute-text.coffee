class AttributeText extends Base

  constructor: ( @attribute, @context  ) ->
    @template = @attribute.nodeValue
    return if @attribute.nodeName.match( /^data/ )
    return unless @template.match( '{' )
    @updateValue()
    @pushBinding()

  updateValue: ->
    value = @parseString( @template )
    if @value isnt value
      @value = value
      @attribute.nodeValue = value

  update: ->
    @updateValue()