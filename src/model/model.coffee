class Model

  @models: []

  constructor: ( @meta = {} ) ->
    class @model extends BaseModel
    @attachMeta()
    @attachStatic()
    @attachBuckets()
    @constructor.models.push( @model )
    return @model

  attachStatic: ->
    for key, prop of @meta.$static or {}
      do ( key, prop ) =>
        if typeof prop is 'function'
          @model[ key ] = => prop.apply( @model, arguments )
        else
          @model[ key ] = prop

  attachMeta: ->
    for key, value of @meta
      @model.prototype[ key ] = value

  attachBuckets: ->
    @model.items = []