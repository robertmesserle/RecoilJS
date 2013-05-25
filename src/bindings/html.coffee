class HTMLBinding extends Base

  constructor: ( @context  ) ->
    return unless @binding = @context.$element.data( 'html' )
    @setValue()
    @pushBinding()

  setValue: ->
    value = @parseBinding @binding
    if @value isnt value
      @value = value
      @context.$element.html @value

  update: ->
    @setValue()