class UpdateBinding extends Base

  constructor: ( @context  ) ->
    return unless @binding = @context.$element.data( 'update' )
    @csString = "-> #{ @binding }"
    @parseBinding( @csString )()
    super

  update: ->
    try @parseBinding( @csString )()