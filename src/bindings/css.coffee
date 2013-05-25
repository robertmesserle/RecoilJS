class CSSBinding extends Base

  constructor: ( @context ) ->
    @binding = @context.$element.data( 'css' )
    @updateCSS()
    @pushBinding()

  updateCSS: ->
    @css = @parseBinding( @binding )
    cssString = JSON.stringify( @css )
    return if @cssString is cssString
    @context.$element.css @css

  update: ->
    @updateCSS()
