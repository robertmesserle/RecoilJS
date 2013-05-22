var Recoil;

Recoil = (function() {
  Recoil.app = null;

  Recoil.bindings = [];

  Recoil.views = {};

  Recoil.transitions = {
    intro: {},
    outro: {}
  };

  Recoil.events = 'blur focus focusin focusout load resize scroll unload click\ndblclick mousedown mouseup mousemove mouseover mouseout mouseenter\nmouseleave change select submit keydown keypress keyup error'.split(/\s+/g);

  Recoil.attributes = 'class id src href style'.split(/\s+/g);

  Recoil.init = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Recoil, arguments, function(){});
  };

  Recoil.createTransition = function(type, id, callback) {
    return Recoil.transitions[type][id] = callback;
  };

  Recoil.checkForChanges = function() {
    return typeof Recoil.app === "function" ? Recoil.app.apply(Recoil, arguments) : void 0;
  };

  function Recoil(id, controller) {
    var _this = this;

    this.id = id;
    this.controller = controller;
    if (Recoil.app) {
      throw "You may only have one app running at a time.";
    }
    $(function(element) {
      var $element;

      $element = $("[data-app='" + _this.id + "']");
      if (!$element.length) {
        throw "No element found for id '" + _this.id + "'.";
      }
      return Recoil.app = new Core($element, _this.controller);
    });
  }

  return Recoil;

})();
