class IfBinding extends Base

  constructor: ( @context ) ->
    @binding = @context.$element.data( 'if' )
    @insertPlaceholder()
    @setValue()
    @pushBinding()
    super

  setValue: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      if @value
        delete @context.stopParsing
        @context.$element.insertAfter( @$placeholder )
      else
        @context.stopParsing = true
        @context.$element.detach()

  update: ->
    @setValue()
