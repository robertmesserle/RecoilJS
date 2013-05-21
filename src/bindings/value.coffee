class ValueBinding extends Base

  constructor: ( @$element, @scope, @parent, @root  ) ->
    @binding = @$element.data( 'value' )
    @setValue()
    @bindEvents()
    @pushBinding()
    @$element.trigger( @getDefaultEvents() ) if @$element.is( 'select' )

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

  getDefaultEvents: ->
    switch @$element.get( 0 ).nodeName.toLowerCase()
      when 'input'
        switch @$element.attr( 'type' )
          when 'checkbox', 'radio' then 'change'
          else 'keydown'
      when 'select' then 'change'
      else 'blur'

  bindEvents: ->
    event = @$element.data( 'update-on' ) or @getDefaultEvents()
    @$element.on event, @updateHandler

  updateHandler: =>
    setTimeout =>
      return if @$element.is( ':radio' ) and not @$element.is( ':checked' )
      newValue =
        switch @$element.attr( 'type' )
          when 'checkbox' then @$element.prop( 'checked' )
          else @$element.val()
      @updateBinding( newValue )

  update: ->
    @setValue() unless @$element.is( ':focus' )