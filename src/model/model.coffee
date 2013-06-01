class Model

  @models: []

  constructor: ( @meta = {} ) ->
    @extendMeta()
    class @model extends BaseModel
    @attachMeta()
    @attachStatic()
    @attachBuckets()
    @constructor.models.push( @model )
    return @model

  extendMeta: ->
    return unless @meta.$extend
    @meta = $.extend true, {}, @meta.$extend._meta, @meta

  attachStatic: ->
    for key, prop of @meta.$static or {}
      do ( key, prop ) =>
        if typeof prop is 'function'
          @model[ key ] = => prop.apply( @model, arguments )
        else
          @model[ key ] = prop

  attachMeta: ->
    @model._meta = @meta
    for key, value of @meta
      @model.prototype[ key ] = value

  attachBuckets: ->
    @model.items = []