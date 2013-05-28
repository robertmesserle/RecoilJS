class IfBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'if' )
    @update()
    @insertPlaceholder()
    super

  setValue: ->
    if @value
      delete @context.stopParsing
      @context.$element.insertAfter( @context.$placeholder )
    else
      @context.stopParsing    = true
      @context.skipBindings   = true
      @context.$element.detach()
      DirtyCheck.cleanBindings()

  update: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      @wrap()
      @setValue()
      @unwrap()
