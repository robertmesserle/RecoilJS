define ( require ) ->

  ContentController = require './content'
  Data = require './data/home'

  class HomeController extends ContentController

    category: 'About'
    title: 'Home'
    data: Data