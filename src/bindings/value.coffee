class ValueBinding extends Base

  constructor: ( @context  ) ->
    return unless @binding = @context.$element.data( 'value' )
    @context.skipChildren = true
    @setValue()
    @updateHandler() if @context.$element.is( 'select' )
    @bindEvents()
    super

  bindEvents: ->
    events = 'click keydown change'
    @context.$element.on events, $.noop

  getValue: ->
    if @context.$element.attr( 'type' ) is 'radio'
      return unless @context.$element.is( ':checked' )
    value = @parseBinding @binding
    value = value?() or value

  setValue: ->
    value = @getValue()
    if @value isnt value
      @value = value
      switch @context.$element.attr( 'type' )
        when 'checkbox' then @context.$element.prop( 'checked', value )
        when 'radio' then break
        else @context.$element.val @value

  updateHandler: =>
    return if @context.$element.is( ':radio' ) and not @context.$element.is( ':checked' )
    value =
      switch @context.$element.attr( 'type' )
        when 'checkbox' then @context.$element.prop( 'checked' )
        else @context.$element.val()
    @updateBinding( @value = value ) unless @value is value

  update: ->
    @setValue()

  write: ->
    @updateHandler()