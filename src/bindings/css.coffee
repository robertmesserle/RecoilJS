Base = require './base.coffee'

class CSSBinding extends Base

  constructor: ( @context ) ->
    return unless @binding = @context.$element.data 'css'
    @updateCSS()
    super

  updateCSS: ->
    @css = @parseBinding @binding
    cssString = JSON.stringify @css
    return if @cssString is cssString
    @context.$element.css @css

  update: ->
    @updateCSS()

module.exports = CSSBinding
