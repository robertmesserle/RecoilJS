class ValueBinding extends Base

  constructor: ( @$element, @scope, @parent, @root  ) ->
    @binding = @$element.data( 'value' )
    @live = @$element.data( 'live' )?
    @setValue()
    @pushBinding()
    @updateHandler() if @$element.is( 'select' )
    @bindEvents()

  bindEvents: ->
    eventType = switch @$element.attr( 'type' )
      when 'radio', 'checkbox' then 'change'
      else
        if @live then 'blur'
    if eventType then @$element.on eventType, @updateHandler

  getValue: ->
    if @$element.attr( 'type' ) is 'radio'
      return unless @$element.is( ':checked' )
    value = @parseBinding @binding
    value = value?() or value

  setValue: ->
    value = @getValue()
    if @value isnt value
      @value = value
      @$element.val @value unless @$element.is( 'input:radio' )

  updateHandler: =>
    return if @$element.is( ':radio' ) and not @$element.is( ':checked' )
    @value =
      switch @$element.attr( 'type' )
        when 'checkbox' then @$element.prop( 'checked' )
        else @$element.val()
    @updateBinding( @value )

  update: ->
    if @$element.is( ':focus' ) and @getValue() is @value and @live
      @updateHandler()
    else
      @setValue()