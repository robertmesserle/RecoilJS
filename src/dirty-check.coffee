
class DirtyCheck

  # Static

  @originalMethods: {}
  @instance: null
  @lastCheck: 0
  @timeout: null

  @update: ->
    return if @timeout
    now = +new Date()
    waitTime = now - @lastCheck
    @lastCheck = now
    if waitTime > Recoil.throttle then waitTime = 0
    callback = =>
      @timeout = null
      # Iterate over writes first
      for set in [ { type: 'write', method: 'write' }, { type: 'read', method: 'update' } ]
        for binding in Recoil.bindings[ set.type ]
          binding[ set.method ]()
    if waitTime then @timeout = @originalMethods.setTimeout callback, waitTime
    else callback()

  # Instance

  elementList:
    if typeof InstallTrigger isnt 'undefined' then [ HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBodyElement, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLDataListElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLElement, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLHeadElement, HTMLHeadingElement, HTMLHtmlElement, HTMLHRElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMediaElement, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTextAreaElement, HTMLTitleElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement ]
    else [ Element ]

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
      originalMethod = root[ func ]
      do ( originalMethod ) =>
        @constructor.originalMethods[ func ] = ->
          originalMethod.apply( root, arguments )
        root[ func ] = ( func, timeout ) ->
          args = Array arguments...
          args[ 0 ] = ->
            func( arguments... )
            DirtyCheck.update()
          originalMethod.apply( root, args )

  bindEvents: ->
    $ ->
      $( document )
        .ajaxComplete( -> DirtyCheck.update() )
        .on( 'keydown click', -> DirtyCheck.originalMethods.setTimeout -> DirtyCheck.update() )
        .on( 'load', 'script', -> DirtyCheck.originalMethods.setTimeout -> DirtyCheck.update() )
