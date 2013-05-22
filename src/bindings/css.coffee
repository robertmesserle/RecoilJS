class CSSBinding extends Base

  constructor: ( @$element, @scope, @parent, @root, @extras ) ->
    @binding = @$element.data( 'css' )
    @css = @parseBinding( @binding )
    @$element.css @css
