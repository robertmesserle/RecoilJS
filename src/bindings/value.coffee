class ValueBinding extends Base

  constructor: ( @context  ) ->
    return unless @binding = @context.$element.data( 'value' )
    console.log 'how did it get here?'
    @context.skipChildren = true
    @live = @context.$element.data( 'live' )?
    @setValue()
    @updateHandler() if @context.$element.is( 'select' )
    @bindEvents()
    super
    Recoil.bindings.write.push( this )

  bindEvents: ->
    switch @context.$element.attr( 'type' )
      when 'radio', 'checkbox'
        @context.$element.on 'change', @updateHandler

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
    return if @context.$element.is( ':focus' ) and not @live

    @updateHandler()