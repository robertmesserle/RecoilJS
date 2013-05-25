class ContextBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'context' )
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
    @setValue()
