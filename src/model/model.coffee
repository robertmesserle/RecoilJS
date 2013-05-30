class Model

  @property: ( data ) -> new Property data

  @create: ( data = {} ) ->
    class RecoilModel extends Model
    for key, prop of data
      RecoilModel.prototype[ key ] = prop
    return RecoilModel

  constructor: ( data ) ->
    @bindDefaultProps()

  bindDefaultProps: ->
    @props = {}
    for key, prop of this when prop instanceof Property
      @props[ key ] = prop
      @[ key ] = prop.value

  revert: ->
    for key, prop of @data
      @[ key ] = prop.value

  save: ->
    for key, prop of @data
      prop.val = @[ key ]