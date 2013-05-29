class IfBinding extends Base

  if: true

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'if' )
    super
    @update()

  setValue: ->
    @context.stopParsing = not @value
    if @value then @context.$element.insertAfter( @context.$placeholder )
    else @context.$element.detach()

  update: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      @wrap()
      @setValue()
      @unwrap()
