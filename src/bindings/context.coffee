class ContextBinding extends Base

  constructor: ( @context ) ->
    @binding = @context.$element.data( 'context' )
    @setValue()
    @pushBinding()
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
