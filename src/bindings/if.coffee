class IfBinding extends Base

  if: true

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'if' )
    super
    @update()
    # Define child parser if initial value is false
    unless @value then @reparse = =>
      # Remove binding from global list
      index = Recoil.bindings.read.indexOf( this )
      Recoil.bindings.read.splice( index, 1 )
      new Parser @context
      delete @reparse
  setValue: ->
    @context.stopParsing = not @value
    if @value
      @context.$element.insertAfter( @context.$placeholder )
      @reparse?()
    else @context.$element.detach()

  update: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      @wrap()
      @setValue()
      @unwrap()
