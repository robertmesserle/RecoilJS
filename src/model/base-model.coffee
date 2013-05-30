class BaseModel

  constructor: ( data = {} ) ->
    @storeInstance()
    @unwrapProps()
    @parseData( data )
    @initialize?( data )

  storeInstance: ->
    @constructor.instances ?= []
    @constructor.instances.push( this )

  unwrapProps: ->
    $props = {}
    for key, prop of @$props
      $props[ key ] = new Property prop
      @[ key ] = $props[ key ].value
    @$props = $props
  
  parseData: ( data ) ->
    for key, value of data
      @[ key ] = value
      @$props[ key ].value = value
  
  revert: ->
    for key, prop of @$props
      @[ key ] = prop.value
  
  save: ->
    for key, prop of @$props
      prop.value = @[ key ]