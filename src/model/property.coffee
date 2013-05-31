class Property

  type:     null
  model:    null
  default:  null
  value:    null

  constructor: ( data = {} ) ->
    @parseData( data )

  parseData: ( data ) ->
    @type       = data.type or ( value ) -> value
    @model      = data.model
    if data.default?
      @default = @type data.default
    if data.value?
      @value = @type data.value
    @value ?= @default
