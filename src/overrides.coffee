globals = $.boring.globals

elementList = 
  if typeof InstallTrigger isnt 'undefined' # Firefox Check
    [ HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBodyElement, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLDataListElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLElement, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLHeadElement, HTMLHeadingElement, HTMLHtmlElement, HTMLHRElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMediaElement, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTextAreaElement, HTMLTitleElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement ]
  else
    [ Element ]

do ->
  for type in elementList
    if type.prototype.addEventListener
      originalMethod = type.prototype.addEventListener
      return unless originalMethod
      type.prototype.addEventListener = ( type, listener ) ->
        args = Array arguments...
        args[ 1 ] = ->
          listener( arguments... )
          globals.app?.checkForChanges()
        originalMethod.apply( this, args )
    if type.prototype.attachEvent
      originalMethod = type.prototype.attachEvent
      return unless originalMethod
      type.prototype.attachEvent = ( type, listener ) ->
        args = Array arguments...
        args[ 1 ] = ->
          listener( arguments... )
          globals.app?.checkForChanges()
        originalMethod.apply( this, args )


$ ->
  $( document ).ajaxComplete ->
    globals.app?.checkForChanges()