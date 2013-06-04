class ContextBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'context' )
    @$template = @context.$element.contents().clone()
    @setValue()
    super

  setValue: ->
    value = @parseBinding @binding
    if @value isnt value
      @value = value
      @setChildContext()

  setChildContext: ->
    @context.childContext =
      scope: @value
      parent: @context.scope

  update: ->
    value = @parseBinding @binding
    return if @value is value
    @context.$element.html @$template.clone()
    @removeBinding()
    # Re-parse element
    new Parser @context
