class Property

  type:     null
  model:    null
  default:  null
  value:    null

  constructor: ( data = {} ) ->
    @parseData( data )

  parseData: ( data ) ->
    @type = data.type
    @model = data.model
    @validate = data.validate
    if data.default?
      @default = if @type? then @type( data.default ) else data.default
    if data.value?
      @value = if @type? then @type( data.value ) else data.value
    else @value = @default
