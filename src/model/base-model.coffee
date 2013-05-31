class BaseModel

  constructor: ( data = {} ) ->
    @_storeItem()
    @_unwrapProps()
    @_createVirtuals()
    @_parseData( data )
    @initialize? data

  # Private

  _storeItem: ->
    @constructor.items ?= []
    @constructor.items.push( this )

  _unwrapProps: ->
    @_history ?= {}
    @_props ?= {}
    for key, prop of @$props or {}
      @_props[ key ] = new Property prop
      @[ key ] = @_history[ key ] = @_props[ key ].value

  _createVirtuals: ->
    @_history   ?= {}
    @_virtuals  ?= {}
    for key, prop of @$virtual or {}
      @[ key ] = @_history[ key ] = prop.read.call( this )
  
  _parseData: ( data ) ->
    for key, value of data

  # Public

  set: ( key, value ) ->
    @[ key ] = value
    @update()
  
  revert: ->
    for key, prop of @_props
      @[ key ] = @_history[ key ] = prop.value
  
  save: ->
    for key, prop of @_props
      if prop.validate?
        if prop.validate.call( this, @[ key ] )
          prop.value = @[ key ]
      else
        prop.value = @[ key ]

  update: ->
    # Check virtuals first
    for key, virtual of @$virtual when @[ key ] isnt @_history[ key ]
      virtual.write.call( this, @[ key ] )
      @_history[ key ] = @[ key ]
    # Check properties
    for key, prop of @_props when @[ key ] isnt @_history[ key ]
      @_history[ key ] = @[ key ]
      # TODO:  Wire up Subscriptions here
    # Update virtuals
    for key, virtual of @$virtual
      newValue = virtual.read.call( this )
      @[ key ] = @_history[ key ] = newValue if @[ key ] isnt newValue
