class ValueBinding extends Base

  constructor: ( @context  ) ->
    @context.stopParsing = true
    @binding = @context.$element.data( 'value' )
    @live = @context.$element.data( 'live' )?
    @setValue()
    @pushBinding()
    @updateHandler() if @context.$element.is( 'select' )
    @bindEvents()

  bindEvents: ->
    eventType = switch @context.$element.attr( 'type' )
      when 'radio', 'checkbox' then 'change'
      else
        if @live then 'blur'
    if eventType then @context.$element.on eventType, @updateHandler

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
    @value =
      switch @context.$element.attr( 'type' )
        when 'checkbox' then @context.$element.prop( 'checked' )
        else @context.$element.val()
    @updateBinding( @value )

  update: ->
    if @context.$element.is( ':focus' )
      if @live
        @updateHandler()
    else
      @setValue()