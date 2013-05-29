define ( require ) ->

  Recoil          = require './recoil'
  SiteController  = require './site'

  Recoil.init new SiteController
