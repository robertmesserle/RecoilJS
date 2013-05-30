class Model

  @models: []

  constructor: ( @meta = {} ) ->
    class @model extends BaseModel
    @attachMeta()
    @constructor.models.push( @model )
    return @model

  attachMeta: ->
    for key, value of @meta
      @model.prototype[ key ] = value