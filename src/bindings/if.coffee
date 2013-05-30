class IfBinding extends Base

  if: true

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data( 'if' )
    super
    @update( false )

  reparse: =>
    # Remove binding from global list
    index = Recoil.bindings.read.indexOf( this )
    Recoil.bindings.read.splice( index, 1 )
    new Parser @context
    delete @reparse

  setValue: ( reparse = false ) ->
    @context.stopParsing = not @value
    if @value
      @context.$element.insertAfter( @context.$placeholder )
      if reparse then @reparse()
    else @context.$element.detach()

  update: ( reparse = true ) ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      @wrap()
      @setValue( reparse )
      @unwrap()
