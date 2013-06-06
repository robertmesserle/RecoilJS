
class DataType

  type:     null
  default:  null
  value:    null
  valid:    true

  constructor: ( data = {}, @context ) ->
    @parseData( data )

  parseType: ( type ) ->
    return ( ( value ) -> value ) unless type
    typeString = type.toString()
    return type if typeString.indexOf( '[native code]' ) + 1
    return ( -> new type arguments... ) if type?.__super__?.constructor is BaseModel
    type = type()
    return ( -> new type arguments... )

  parseData: ( data ) ->
    @type         = @parseType( data.type )
    @_validate    = data.validate or -> true
    @_subscribe   = data.subscribe or -> true

  validate: ->
    @_validate.call @context, @value