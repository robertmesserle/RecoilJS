define ( require ) ->

  SectionController = require './section'
  Recoil = require './recoil'

  class SampleController extends SectionController

    view: 'samples'
    category: 'About'
    title: 'Samples'

    constructor: ->
      @phoneNumber = '1231231231'
      @formattedPhoneNumber = =>
        strippedPhoneNumber   = @phoneNumber.replace( /[^\d]/g, '' ).substring( 0, 10 )
        strippedPhoneNumber   += Array( 11 - strippedPhoneNumber.length ).join( '_' )
        areaCode              = strippedPhoneNumber.substring( 0, 3 )
        introBlock            = strippedPhoneNumber.substring( 3, 6 )
        lastBlock             = strippedPhoneNumber.substring( 6, 10 )
        "(#{ areaCode }) #{ introBlock }-#{ lastBlock}"

      @searchTerm = ''

      @selectValue = ''
      @selectOptions = Recoil.events

      @checkboxValue = ''

      @radioOption = ''

    getHighlightedTerm: ( text ) =>
      return text unless @searchTerm
      text
        .split( @searchTerm )
        .join( "<span class='highlight'>#{ @searchTerm }</span>" )
