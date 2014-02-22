shared     = require './shared.coffee'
DirtyCheck = require './dirty-check.coffee'
Core       = require './core.coffee'
Router     = require './router.coffee'
Property   = require './model/property.coffee'
Collection = require './model/collection.coffee'
Model      = require './model/model.coffee'

class Recoil

  @init:                  -> new Recoil arguments...

  @Property:              Property
  @Collection:            Collection
  @Model:                 Model

  @mapRoute:              -> Router.getInstance().mapRoute arguments...
  @mapDefaultRoute:       -> Router.getInstance().mapDefaultRoute arguments...
  @triggerRouteChange:    -> Router.getInstance().handleChange()

  @createTransition:      ( type, id, callback ) -> Recoil.transitions[ type ][ id ] = callback

  @setViewPath:           ( viewPath ) -> shared.viewPath = viewPath
  @setMaxUpdateFrequency: ( throttle ) -> shared.throttle = throttle

  constructor: ( args..., @controller ) ->
    if shared.app then throw "You may only have one app running at a time."
    $ =>
      new DirtyCheck()
      $element   = $( "[data-app='#{ args[ 0 ] }'], [data-app], body" ).eq 0
      shared.app = new Core( $element, @controller )

window?.Recoil  = Recoil
module?.exports = Recoil
