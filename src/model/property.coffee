shared    = require( '../shared.coffee' )
DataType  = require( './data-type.coffee' )
BaseModel = require( './base-model.coffee' )
Model     = require( './model.coffee' )

class Property extends DataType

  default:  null

  parseType: ( type ) ->
    return ( ( value ) -> value ) unless type
    typeString = type.toString()
    return type if typeString.indexOf( '[native code]' ) + 1
    return ( -> new type arguments... ) if type?.__super__?.constructor is BaseModel
    type = type()
    return ( -> new type arguments... )

  parseData: ( data ) ->
    super
    if data.default?
      @default = @type data.default
    @value = @savedValue = @default

  set: ( value, subscribe = true ) ->
    @_subscribe.call @context, value, @value if subscribe
    @value =
      if @type instanceof Model then new @type value
      else @type value

  unset: ->
    @value = @default

  save: ->
    @savedValue = @value if @validate()

  revert: ->
    @value = @savedValue

shared.Property = Property
module.exports  = Property
