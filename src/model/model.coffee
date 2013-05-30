class Model

  constructor: ( @meta = {} ) ->
    class @model extends BaseModel
    @attachMeta()
    return @model

  attachMeta: ->
    for key, value of @meta
      @model.prototype[ key ] = value