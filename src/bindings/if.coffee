class IfBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'if' )
    @wrap()
    @insertPlaceholder()
    @setValue()
    super

  setValue: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      if @value
        delete @context.stopParsing
        @context.$element.insertAfter( @context.$placeholder )
      else
        @context.stopParsing = true
        @context.$element.detach()

  update: ->
    @setValue()
