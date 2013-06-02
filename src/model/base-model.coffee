class BaseModel

  constructor: ( data = {} ) ->
    @_createBuckets()
    @_storeItem()
    @_wrapProps()
    @_createVirtuals()
    @set( data, null, true, false )
    @save()
    @_parseValidates()
    @_parseSubscribes()
    @initialize? data

  # Private

  _createBuckets: ->
    @props = {}
    @virtuals = {}

  _storeItem: ->
    @constructor.items.push( this )

  _wrapProps: ->
    for key, prop of @$props or {}
      @props[ key ] = new Property prop, @context
      @[ key ] = @props[ key ].value

  _createVirtuals: ->
    for key, prop of @$virtual or {}
      @virtuals[ key ] = virtual = new Virtual prop, this
      @[ key ] = virtual.value

  _parseValidates: ->
    for key, value of @$validate
      @props[ key ]._validate = value

  _parseSubscribes: ->
    for key, value of @$subscribe
      @props[ key ]._subscribe = value

  # Public

  set: ( key, value, update = true, subscribe = true ) ->
    if typeof key is 'object'
      obj = key
      for key, value of obj
        @set key, value, false, subscribe
      @update() if update
    else
      if @props[ key ]
        @[ key ] = @props[ key ].set value, subscribe
        @updateVirtuals() if update
      else if @virtuals[ key ]
        @[ key ] = @virtuals[ key ].set value, subscribe
        @checkProps() if update

  unset: ( key ) ->
    @[ key ] = @props[ key ].unset()
  
  revert: ->
    for key, prop of @props
      @[ key ] = prop.revert()
      @updateVirtuals()

  validate: ->
    for key, prop of @props
      return false unless prop.validate()
    return true

  escape: ( key ) ->
    return @[ key ].replace( /</g, '&lt;' ).replace( />/g, '&gt;' )
  
  save: ->
    return false unless @validate()
    for key, prop of @props
      prop.save()
    return true

  checkVirtuals: ->
    for key, virtual of @virtuals when @[ key ] isnt virtual.value
      @[ key ] = virtual.set @[ key ]

  checkProps: ->
    for key, prop of @props when @[ key ] isnt prop.value
      @[ key ] = prop.set @[ key ]
    @updateVirtuals()

  updateVirtuals: ->
    for key, virtual of @virtuals
      @[ key ] = virtual.update()

  update: ->
    @checkVirtuals()
    @checkProps()