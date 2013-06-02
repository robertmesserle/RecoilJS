class Property

  type:     null
  model:    null
  default:  null
  value:    null
  valid:    true

  constructor: ( data = {}, @context ) ->
    @parseData( data )

  parseType: ( type ) ->
    return ( ( value ) -> value ) unless type
    typeString = type.toString()
    return type if typeString.indexOf( '[native code]' ) + 1
    return ( -> new type arguments... ) if type instanceof Recoil.Model
    type = type()
    return ( -> new type arguments... )

  parseData: ( data ) ->
    @type       = @parseType( data.type )
    @model      = data.model
    if data.default?
      @default = @type data.default
    @value = @savedValue = @default
    @_validate = data.validate or -> true
    @_subscribe = data.subscribe or -> true

  set: ( value, subscribe = true ) ->
    @_subscribe.call @context, value, @value if subscribe
    @value =
      if @type instanceof Recoil.Model then new @type value
      else @type value

  unset: ->
    @value = @default

  validate: ->
    @_validate.call @context, @value

  save: ->
    @savedValue = @value if @validate()

  revert: ->
    @value = @savedValue