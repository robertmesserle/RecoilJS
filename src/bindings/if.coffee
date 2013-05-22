class IfBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras, @callback ) ->
    @binding = @$element.data( 'if' )
    @insertPlaceholder()
    @setValue()
    @pushBinding()

  setValue: ->
    value = !! @parseBinding @binding
    if @value isnt value
      @value = value
      if @value
        @$element.insertAfter( @$placeholder )
        new Parser( @$element.contents(), @scope, @parent, @root, @extras )
      else
        @$element.detach()

  update: ->
    @setValue()
