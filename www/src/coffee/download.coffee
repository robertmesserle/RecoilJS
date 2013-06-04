define ( require ) ->

  ContentController = require './content'
  Data = require './data/download'

  class DownloadController extends ContentController

    category: 'About'
    title: 'Download'
    data: Data