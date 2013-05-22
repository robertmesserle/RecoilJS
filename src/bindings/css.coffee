class CSSBinding extends Base

  constructor: ( @$element, @scope, @parent, @root ) ->
    @binding = @$element.data( 'css' )
    @css = @parseBinding( @binding )
    @$element.css @css