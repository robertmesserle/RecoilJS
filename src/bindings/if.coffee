class IfBinding extends Base

  constructor: ( @context ) ->
    @wrap()
    @binding = @context.$element.data( 'if' )
    @insertPlaceholder()
    @setValue()
    @pushBinding()
    @unwrap()

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
