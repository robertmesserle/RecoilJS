
class DirtyCheck

  # Static
  @originalMethods: {}
  @instance: null

  # Instance
  lastCheck: 0
  timeout: null
  elementList:
    if typeof InstallTrigger isnt 'undefined' then [ HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBodyElement, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLDataListElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLElement, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLHeadElement, HTMLHeadingElement, HTMLHtmlElement, HTMLHRElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMediaElement, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTextAreaElement, HTMLTitleElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement ]
    else [ Element ]

  @update: ->
    @originalMethods.setTimeout =>
      for binding in Recoil.bindings
        binding.update()
      @cleanBindings()

  @cleanBindings: ->
    count = Recoil.bindings.length
    for index in [ count - 1..0 ]
      binding = Recoil.bindings[ index ]
      element = binding.$placeholder?.get( 0 ) or binding.$element?.get( 0 )
      Recoil.bindings.splice( index, 1 ) unless $.contains( document.body, element )

  constructor: ->
    # Treat as a Singleton
    return @constructor.instance if @constructor.instance
    @constructor.instance = this
    # On with the show!
    @overwriteEventListeners()
    @overwriteTimeouts()
    @bindEvents()

  overwriteEventListeners: ->
    for type in @elementList
      for func in [ 'addEventListener', 'attachEvent' ]
        return unless originalMethod = type.prototype[ func ]
        do ( originalMethod ) ->
          type.prototype[ func ] = ( type, listener ) ->
            args = Array arguments...
            args[ 1 ] = ->
              listener( arguments... )
              DirtyCheck.update()
            originalMethod.apply( this, args )

  overwriteTimeouts: ->
    for func in [ 'setTimeout', 'setInterval' ]
      originalMethod = window[ func ]
      do ( originalMethod ) =>
        @constructor.originalMethods[ func ] = ->
          originalMethod.apply( window, arguments )
        window[ func ] = ( func, timeout ) ->
          args = Array arguments...
          args[ 0 ] = ->
            func( arguments... )
            DirtyCheck.update()
          originalMethod.apply( window, args )

  bindEvents: ->
    $ ->
      $( document )
        .ajaxComplete( -> DirtyCheck.update() )
        .on( 'keydown click', -> DirtyCheck.update() )