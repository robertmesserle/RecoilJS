class BaseModel

  constructor: ( data = {} ) ->
    @storeInstance()
    @unwrapProps()
    @createVirtuals()
    @parseData( data )
    @initialize?( data )

  storeInstance: ->
    @constructor.instances ?= []
    @constructor.instances.push( this )

  unwrapProps: ->
    $props = {}
    for key, prop of @$props or {}
      $props[ key ] = new Property prop
      @[ key ] = $props[ key ].value
    @$props = $props

  createVirtuals: ->
    for key, prop of @$virtual or {}
      do ( key, prop ) =>
        @[ key ] = ( value ) =>
          if value? and prop.write
            prop.write.call( this, value )
          else
            prop.read.call( this )
  
  parseData: ( data ) ->
    for key, value of data
      if @$virtual[ key ]?
        @[ key ]( value )
      else
        @[ key ] = value
        @$props[ key ].value = value
  
  revert: ->
    for key, prop of @$props
      @[ key ] = prop.value
  
  save: ->
    for key, prop of @$props
      prop.value = @[ key ]