class Recoil

  @app:           null
  @viewPath:      './views'
  @throttle:      30
  @bindings:
    read:         []
    write:        []
  @views:         {}
  @transitions:
    intro:        {}
    outro:        {}
  @events:
    '''
    blur focus focusin focusout load resize scroll unload click
    dblclick mousedown mouseup mousemove mouseover mouseout mouseenter
    mouseleave change select submit keydown keypress keyup error
    '''.split( /\s+/g )

  @eval: ( func ) -> eval func.toString()

  @init: -> new Recoil( arguments... )

  @Property:   Property
  @Collection: Collection
  @Model:      Model

  @mapRoute:            -> Router.getInstance().mapRoute arguments...
  @mapDefaultRoute:     -> Router.getInstance().mapDefaultRoute arguments...
  @triggerRouteChange:  -> Router.getInstance().handleChange()

  @createTransition: ( type, id, callback ) -> Recoil.transitions[ type ][ id ] = callback

  @setViewPath: ( @viewPath ) ->
  @setMaxUpdateFrequency: ( @throttle ) ->

  @compile: ( str ) ->
    if CoffeeScript?.compile then CoffeeScript.compile "do -> #{ str }", bare: true
    else
      exp = /.#\{([^\}]*[^\\])\}/g
      str = str.replace( /\n/g, '\\n' )
      str = str.replace exp, ( match, expression ) ->
        firstChar = match.charAt( 0 )
        if firstChar is '\\' then match
        else "#{ firstChar }\" + ( #{ expression } ) + \""
      "( function () { return #{ str }; } )()"

  constructor: ( args..., @controller ) ->
    if Recoil.app then throw "You may only have one app running at a time."
    $ =>
      new DirtyCheck()
      $element    = $( "[data-app='#{ args[ 0 ] }'], [data-app], body" ).eq( 0 )
      Recoil.app  = new Core( $element, @controller )
