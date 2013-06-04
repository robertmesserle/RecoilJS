define ( require ) ->

  Recoil = require './recoil'
  NavData = require './data/nav'

  class SiteController

    view: 'site'

    activeSection: null

    navSections: NavData

    constructor: ->
      @setupRoutes()

    setupRoutes: ->
      Recoil.mapDefaultRoute =>
        Recoil.goto @navSections[ 0 ].sections[ 0 ].href
      for category in @navSections
        for section in category.sections
          continue unless section.controller
          do ( section ) =>
            Recoil.mapRoute section.href.substring( 1 ), =>
              @activeSection = new section.controller
      Recoil.triggerRouteChange()