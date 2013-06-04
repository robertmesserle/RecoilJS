class IfBinding extends Base

  if: true

  constructor: ( @context ) ->
    return unless ( @binding = @context.$element.data( 'if' ) )?
    @checkForErrors()
    super
    @update( false )

  checkForErrors: ->
    if @context.$element.data( 'for' )
      throw 'Recoil Error:  "data-for" and "data-if" cannot be used on the same element.' 

  reparse: =>
    @wrap()
    @removeBinding()
    new Parser @context
    delete @reparse

  setValue: ( reparse = false ) ->
    @context.stopParsing = not @value
    if @value
      @context.$element.insertAfter( @context.$placeholder )
      if reparse then @reparse()
    else
      @context.$element.detach()
      @cleanParentBindings()

  update: ( reparse = true ) ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      @wrap()
      @setValue( reparse )
      @unwrap()
