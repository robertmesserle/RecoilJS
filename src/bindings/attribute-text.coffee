class AttributeText extends Base

  constructor: ( @context, @attribute  ) ->
    return @parseAttributes() unless @attribute
    @template = @attribute.nodeValue
    return if @attribute.nodeName.match( /^data/ )
    return unless @template.match( '{' )
    @updateValue()
    @pushBinding()

  parseAttributes: ->
    for attribute in @context.$element.get( 0 ).attributes or []
      new AttributeText( @context, attribute )

  updateValue: ->
    value = @parseString( @template )
    if @value isnt value
      @value = value
      @attribute.nodeValue = value

  update: ->
    @updateValue()