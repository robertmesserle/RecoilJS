class Property

  type:     null
  model:    null
  default:  null
  value:    null
  valid:    true

  constructor: ( data = {}, @context ) ->
    @parseData( data )

  parseData: ( data ) ->
    @type       = data.type or ( value ) -> value
    @model      = data.model
    if data.default?
      @default = @type data.default
    @value = @savedValue = @default
    @_validate = data.validate or -> true
    @_subscribe = data.subscribe or -> true

  set: ( value, subscribe = true ) ->
    @_subscribe.call @context, value, @value if subscribe
    @value = value

  unset: ->
    @value = @default

  validate: ->
    @_validate.call @context, @value

  save: ->
    @savedValue = @value if @validate()

  revert: ->
    @value = @savedValue