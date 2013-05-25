class HashListener

  delay: 50

  constructor: ( @event ) ->
    @hash     = @getHash()
    @$window  = $( window )

  getHash: ->
    location.hash.replace( /^#/, '' )

  start: ->
    @timeout ?= @poll()

  stop: ->
    clearTimeout( @timeout ) if @timeout
    @timeout = null

  poll: ->
    hash = @getHash()
    if hash isnt @hash
      @hash = hash
      @$window.trigger( @event )
    DirtyCheck.originalMethods.setTimeout @poll, @delay