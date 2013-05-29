class IfBinding extends Base

  if: true

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'if' )
    super
    @update()
    # Define child parser if initial value is false
    unless @value then @parseChildren = ->
      new Parser $.extend {}, @context, $element: @context.$element.contents()
      delete @parseChildren
  setValue: ->
    @context.stopParsing = not @value
    if @value
      @context.$element.insertAfter( @context.$placeholder )
      @parseChildren?()
    else @context.$element.detach()

  update: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      @wrap()
      @setValue()
      @unwrap()
