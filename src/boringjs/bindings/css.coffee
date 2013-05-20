define ( require ) ->

  Base = require './base'

  class CssBinding extends Base

    constructor: ( @$element, @scope, @parent, @root ) ->
      @binding = @$element.data( 'css' )
      @css = @parseBinding( @binding )
      @$element.css @css
