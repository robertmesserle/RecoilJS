class BaseModel

  constructor: ( data = {} ) ->
    @unwrapProps()
    @parseData( data )
  unwrapProps: ->
    @_props = {}
    for key, prop of @props or {}
      propObj = @_props[ key ] = new Property prop
      @[ key ] = propObj.value
  parseData: ( data ) ->
    for key, value of data
      @[ key ] = value
      @_props[ key ].value = value
  revert: ->
    for key, prop of @_props
      @[ key ] = prop.value
  save: ->
    for key, prop of @_props
      prop.value = @[ key ]