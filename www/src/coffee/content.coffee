define ( require ) ->

  SectionController = require './section'

  class ContentController extends SectionController

    view: 'content'