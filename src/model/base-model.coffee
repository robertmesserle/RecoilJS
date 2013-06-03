class BaseModel

  @getByField: ( field, value ) ->
    for item in @items
      return item if item[ field ] is value

  @load: ( id, callback ) ->
    return @loadOne( id, callback ) if id?
    $.ajax
      url: @paths.root()
      success: ( data ) =>
        for item in data
          match = @getByField( 'id', item.id )
          if match?
            for field, value of data
              match[ field ] = value
            match.isNew = false
          else
            model = new this item
            model.isNew = false
        callback?( @items )

  @loadOne: ( id, callback ) ->
    $.ajax
      url: @paths.get.call( id: id )
      success: ( data ) =>
        item = new this data
        callback?( item )

  isNew: true

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

  send: ->
    ajax =
      url: if @isNew then @constructor.paths.post.call( this ) else @constructor.paths.put.call( this )
      data: @toJSON()
      type: if @isNew then 'POST' else 'PUT'
      success: ( data ) =>
        @isNew = false
        return false unless data
        for key, value of data
          @[ key ] = @props[ key ].set value
        @updateVirtuals()
    $.ajax ajax
    return ajax


  fetch: ->
    $.ajax
      url: @constructor.paths.get.call( this )
      complete: ( data ) -> @set( data )

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

  toJSON: ->
    json = {}
    for key, prop of @props
      json[ key ] = prop.value?.toJSON?() or prop.value
    return json

  update: ->
    @checkVirtuals()
    @checkProps()