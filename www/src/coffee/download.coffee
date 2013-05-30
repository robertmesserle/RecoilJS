define ( require ) ->

  SectionController = require './section'

  class DownloadController extends SectionController

    view: 'download'
    category: 'About'
    title: 'Download'

    constructor: ->