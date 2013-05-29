define ( require ) ->

  SectionController = require './section-controller'

  class DownloadController extends SectionController

    view: 'download'
    category: 'About'
    title: 'Download'

    constructor: ->