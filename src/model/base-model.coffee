class BaseModel

  constructor: ( data = {} ) ->
    @_createBuckets()
    @_storeItem()
    @_wrapProps()
    @_createVirtuals()
    @_parseData( data )
    @_parseValidates()
    @_parseSubscribes()
    @initialize? data

  # Private

  _createBuckets: ->
    @_history     = {}
    @_props       = {}
    @_validates   = {}
    @_subscribes  = {}

  _storeItem: ->
    @constructor.items.push( this )

  _wrapProps: ->
    for key, prop of @$props or {}
      @_props[ key ] = new Property prop
      @[ key ] = @_history[ key ] = @_props[ key ].value

  _createVirtuals: ->
    for key, prop of @$virtual or {}
      @[ key ] = @_history[ key ] = prop.read.call( this )
  
  _parseData: ( data ) ->
    for key, value of data
      @set( key, value, false )
    @update()
    @save()

  _parseValidates: ->
    for key, value of @$validate
      @_validates[ key ] = value
    for key, value of @$props when value.validate?
      @_validates[ key ] = value.validate

  _parseSubscribes: ->
    for key, value of @$subscribe
      @_subscribes[ key ] = value
    for key, value of @$props when value.subscribe?
      @_subscribes[ key ] = value.subscribe

  # Public

  set: ( key, value, update = true ) ->
    if typeof key is 'object'
      obj = key
      for key, value of obj
        @set key, value, false
    else
      @[ key ] = value
    @update() if update
  
  revert: ->
    for key, prop of @_props
      @[ key ] = @_history[ key ] = prop.value

  validate: ->
    for key, prop of @_props
      valid = @_validates[ key ]?.call this, @[ key ]
      if valid? and not valid then return false
    return true

  escape: ( key ) ->
    return @[ key ].replace( /</g, '&lt;' ).replace( />/g, '&gt;' )
  
  save: ->
    return false unless @validate()
    for key, prop of @_props
      prop.value = @[ key ]
    return true

  update: ->
    # Check virtuals first
    for key, virtual of @$virtual
      oldValue = @_history[ key ]
      newValue = @[ key ]
      continue if oldValue is newValue
      virtual.write.call( this, newValue )
      @_history[ key ] = newValue
      @_subscribes[ key ]?.call this, newValue, oldValue
    # Check properties
    for key, prop of @_props when @[ key ] isnt @_history[ key ]
      oldValue = @_history[ key ]
      newValue = @[ key ]
      continue if oldValue is newValue
      @_history[ key ] = newValue
      @_subscribes[ key ]?.call this, newValue, oldValue
    # Update virtuals
    for key, virtual of @$virtual
      oldValue = @_history[ key ]
      newValue = virtual.read.call( this )
      continue if oldValue is newValue
      @[ key ] = @_history[ key ] = newValue
      @_subscribes[ key ]?.call this, newValue, oldValue
