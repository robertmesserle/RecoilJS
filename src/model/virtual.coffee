class Virtual

  constructor: ( @meta, @context ) ->
    @update()

  set: ( value ) ->
    @meta.write?.call @context, value
    @update()

  get: ->
    @value = @meta.read?.call @context

  update: ->
    @get()