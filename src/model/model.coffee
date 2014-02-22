BaseModel = require './base-model.coffee'

class Model

  @models: []

  constructor: ( @meta = {} ) ->
    @extendMeta()
    class @model extends BaseModel
    @attachMeta()
    @attachStatic()
    @attachBuckets()
    @initPaths()
    @constructor.models.push @model
    return @model

  extendMeta: ->
    return unless @meta.$extend
    @meta = $.extend true, {}, @meta.$extend._meta, @meta

  attachStatic: ->
    for key, prop of @meta.$static or {}
      do ( key, prop ) =>
        if typeof prop is 'function'
          @model[ key ] = => prop.apply @model, arguments
        else
          @model[ key ] = prop

  attachMeta: ->
    @model._meta = @meta
    for key, value of @meta
      @model.prototype[ key ] = value

  attachBuckets: ->
    @model.items = []

  initPaths: ->
    $path     = @meta.$path
    $paths    = @meta.$paths
    rootPath  = $path or $paths?.root
    if typeof rootPath isnt 'function'
      pathString = rootPath
      rootPath = -> pathString
    paths =
      root:   rootPath
      get:    -> "#{ paths.root.call @model }/#{ @id }"
      put:    -> paths.get.call this
      post:   -> paths.root.call @model
      delete: -> paths.get.call this
    @model.paths = paths

module.exports = Model
