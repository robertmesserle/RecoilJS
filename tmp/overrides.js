(function() {
  var elementList;

  elementList = typeof InstallTrigger !== 'undefined' ? [HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBodyElement, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLDataListElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLElement, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLHeadElement, HTMLHeadingElement, HTMLHtmlElement, HTMLHRElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMediaElement, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTextAreaElement, HTMLTitleElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement] : [Element];
  (function() {
    var originalMethod, type, _i, _len;

    for (_i = 0, _len = elementList.length; _i < _len; _i++) {
      type = elementList[_i];
      if (type.prototype.addEventListener) {
        originalMethod = type.prototype.addEventListener;
        if (!originalMethod) {
          return;
        }
        type.prototype.addEventListener = function(type, listener) {
          var args;

          args = Array.apply(null, arguments);
          args[1] = function() {
            listener.apply(null, arguments);
            return Recoil.checkForChanges();
          };
          return originalMethod.apply(this, args);
        };
      }
      if (type.prototype.attachEvent) {
        originalMethod = type.prototype.attachEvent;
        if (!originalMethod) {
          return;
        }
        type.prototype.attachEvent = function(type, listener) {
          var args;

          args = Array.apply(null, arguments);
          args[1] = function() {
            listener.apply(null, arguments);
            return Recoil.checkForChanges();
          };
          return originalMethod.apply(this, args);
        };
      }
    }
  })();
  return $(function() {
    $(document).ajaxComplete(function() {
      return Recoil.checkForChanges();
    });
    return $(document).on('keydown click', function() {
      return Recoil.checkForChanges();
    });
  });
})();
