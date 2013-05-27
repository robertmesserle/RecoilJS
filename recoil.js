/*! RecoilJS (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/RecoilJS */
/*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */

( function ( root, $ ) {
var DirtyCheck;

DirtyCheck = (function() {
  DirtyCheck.originalMethods = {};

  DirtyCheck.instance = null;

  DirtyCheck.lastCheck = 0;

  DirtyCheck.timeout = null;

  DirtyCheck.update = function() {
    var callback, now, waitTime,
      _this = this;

    if (this.timeout) {
      return;
    }
    now = +new Date();
    waitTime = now - this.lastCheck;
    this.lastCheck = now;
    if (waitTime > Recoil.throttle) {
      waitTime = 0;
    }
    callback = function() {
      var binding, _i, _j, _len, _len1, _ref, _ref1, _results;

      _this.timeout = null;
      _ref = Recoil.bindings.write;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        binding.write();
      }
      _ref1 = Recoil.bindings.read;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        binding = _ref1[_j];
        _results.push(binding.update());
      }
      return _results;
    };
    if (waitTime) {
      return this.timeout = this.originalMethods.setTimeout(callback, waitTime);
    } else {
      return callback();
    }
  };

  DirtyCheck.cleanBindings = function() {
    return this.originalMethods.setTimeout(function() {
      var binding, count, element, index, list, type, _i, _j, _len, _ref, _ref1, _ref2, _ref3;

      _ref = ['read', 'write'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        list = Recoil.bindings[type];
        count = list.length;
        if (!count) {
          return;
        }
        for (index = _j = _ref1 = count - 1; _ref1 <= 0 ? _j <= 0 : _j >= 0; index = _ref1 <= 0 ? ++_j : --_j) {
          binding = list[index];
          element = ((_ref2 = binding.context.$placeholder) != null ? _ref2.get(0) : void 0) || ((_ref3 = binding.context.$element) != null ? _ref3.get(0) : void 0);
          if (!$.contains(document.body, element)) {
            list.splice(index, 1);
          }
        }
      }
    });
  };

  DirtyCheck.prototype.elementList = typeof InstallTrigger !== 'undefined' ? [HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBodyElement, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLDataListElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLElement, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLHeadElement, HTMLHeadingElement, HTMLHtmlElement, HTMLHRElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMediaElement, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTextAreaElement, HTMLTitleElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement] : [Element];

  function DirtyCheck() {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }
    this.constructor.instance = this;
    this.overwriteEventListeners();
    this.overwriteTimeouts();
    this.bindEvents();
  }

  DirtyCheck.prototype.overwriteEventListeners = function() {
    var func, originalMethod, type, _fn, _i, _j, _len, _len1, _ref, _ref1;

    _ref = this.elementList;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      type = _ref[_i];
      _ref1 = ['addEventListener', 'attachEvent'];
      _fn = function(originalMethod) {
        return type.prototype[func] = function(type, listener) {
          var args;

          args = Array.apply(null, arguments);
          args[1] = function() {
            listener.apply(null, arguments);
            return DirtyCheck.update();
          };
          return originalMethod.apply(this, args);
        };
      };
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        func = _ref1[_j];
        if (!(originalMethod = type.prototype[func])) {
          return;
        }
        _fn(originalMethod);
      }
    }
  };

  DirtyCheck.prototype.overwriteTimeouts = function() {
    var func, originalMethod, _i, _len, _ref, _results,
      _this = this;

    _ref = ['setTimeout', 'setInterval'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      func = _ref[_i];
      originalMethod = root[func];
      _results.push((function(originalMethod) {
        _this.constructor.originalMethods[func] = function() {
          return originalMethod.apply(root, arguments);
        };
        return root[func] = function(func, timeout) {
          var args;

          args = Array.apply(null, arguments);
          args[0] = function() {
            func.apply(null, arguments);
            return DirtyCheck.update();
          };
          return originalMethod.apply(root, args);
        };
      })(originalMethod));
    }
    return _results;
  };

  DirtyCheck.prototype.bindEvents = function() {
    return $(function() {
      return $(document).ajaxComplete(function() {
        return DirtyCheck.update();
      }).on('keydown click', function() {
        return DirtyCheck.originalMethods.setTimeout(function() {
          return DirtyCheck.update();
        });
      }).on('load', 'script', function() {
        return DirtyCheck.originalMethods.setTimeout(function() {
          return DirtyCheck.update();
        });
      });
    });
  };

  return DirtyCheck;

})();

var Router,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Router = (function() {
  Router.getInstance = function() {
    var _ref;

    return (_ref = this.instance) != null ? _ref : this.instance = new Router;
  };

  Router.prototype.event = 'hashchange';

  Router.prototype.mode = document.documentMode;

  Router.prototype.support = (root["on" + Router.event] != null) && ((Router.mode == null) || Router.mode > 7);

  Router.prototype.routes = [];

  Router.prototype.defaultRoute = null;

  function Router() {
    this.handleChange = __bind(this.handleChange, this);    this.createSpecialEvent();
    this.bindEvent();
  }

  Router.prototype.bindEvent = function() {
    return $(window).on('hashchange', this.handleChange);
  };

  Router.prototype.handleChange = function(event) {
    var hash, route, _i, _len, _ref, _ref1;

    hash = location.hash.replace(/^#/, '');
    _ref = this.routes.sort(function(a, b) {
      return b.path.length - a.path.length;
    });
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      route = _ref[_i];
      if (route.regex.test(hash)) {
        return route.handler(this.getParams(hash, route));
      }
    }
    return (_ref1 = this.defaultRoute) != null ? _ref1.handler(hash) : void 0;
  };

  Router.prototype.createSpecialEvent = function() {
    var _this = this;

    return $.extend($.event.special[this.event], {
      start: function() {
        if (_this.support) {
          return false;
        }
        _this.HashListener = new HashListener(_this.event);
        return $(_this.HashListener.start);
      },
      teardown: function() {
        if (_this.support) {
          return false;
        }
        return $(_this.HashListener.stop);
      }
    });
  };

  Router.prototype.getRegex = function(path) {
    var index, part, parts, _i, _len;

    parts = path.split('/');
    for (index = _i = 0, _len = parts.length; _i < _len; index = ++_i) {
      part = parts[index];
      if (part.charAt(0) === ':') {
        parts[index] = '[^\\\/]+';
      } else {
        parts[index] = part.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }
    }
    return new RegExp("^" + (parts.join('\\\/')));
  };

  Router.prototype.mapDefaultRoute = function(handler) {
    return this.defaultRoute = {
      handler: handler
    };
  };

  Router.prototype.mapRoute = function(path, handler) {
    var route;

    route = {
      regex: this.getRegex(path),
      path: path,
      handler: handler
    };
    return this.routes.push(route);
  };

  Router.prototype.getParams = function(hash, route) {
    var hashParts, index, params, part, routeParts, _i, _len;

    params = {};
    hashParts = hash.split('/');
    routeParts = route.path.split('/');
    for (index = _i = 0, _len = routeParts.length; _i < _len; index = ++_i) {
      part = routeParts[index];
      if (part.charAt(0) === ':') {
        params[part.substring(1)] = hashParts[index];
      }
    }
    params.$rest = hashParts.slice(routeParts.length).join('/');
    return params;
  };

  return Router;

})();

var Recoil,
  __slice = [].slice;

Recoil = (function() {
  Recoil.app = null;

  Recoil.viewPath = './views';

  Recoil.throttle = 50;

  Recoil.bindings = {
    read: [],
    write: []
  };

  Recoil.views = {};

  Recoil.transitions = {
    intro: {},
    outro: {}
  };

  Recoil.events = 'blur focus focusin focusout load resize scroll unload click\ndblclick mousedown mouseup mousemove mouseover mouseout mouseenter\nmouseleave change select submit keydown keypress keyup error'.split(/\s+/g);

  Recoil.init = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Recoil, arguments, function(){});
  };

  Recoil.mapRoute = function() {
    var _ref;

    return (_ref = Router.getInstance()).mapRoute.apply(_ref, arguments);
  };

  Recoil.mapDefaultRoute = function() {
    var _ref;

    return (_ref = Router.getInstance()).mapDefaultRoute.apply(_ref, arguments);
  };

  Recoil.createTransition = function(type, id, callback) {
    return Recoil.transitions[type][id] = callback;
  };

  Recoil.setViewPath = function(viewPath) {
    this.viewPath = viewPath;
  };

  Recoil.setMaxUpdateFrequency = function(throttle) {
    this.throttle = throttle;
  };

  Recoil.compile = function(str) {
    var exp;

    if (typeof CoffeeScript !== "undefined" && CoffeeScript !== null ? CoffeeScript.compile : void 0) {
      return CoffeeScript.compile("do -> " + str, {
        bare: true
      });
    } else {
      exp = /.#\{([^\}]*[^\\])\}/g;
      str = str.replace(/\n/g, '\\n');
      str = str.replace(exp, function(match, expression) {
        var firstChar;

        firstChar = match.charAt(0);
        if (firstChar === '\\') {
          return match;
        } else {
          return "" + firstChar + "\" + ( " + expression + " ) + \"";
        }
      });
      return "( function () { return " + str + "; } )()";
    }
  };

  function Recoil() {
    var args, controller, _i,
      _this = this;

    args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), controller = arguments[_i++];
    this.controller = controller;
    if (Recoil.app) {
      throw "You may only have one app running at a time.";
    }
    $(function() {
      var $element;

      new DirtyCheck();
      $element = $("[data-app='" + args[0] + "'], [data-app], body").eq(0);
      return Recoil.app = new Core($element, _this.controller);
    });
  }

  return Recoil;

})();

var Base;

Base = (function() {
  function Base() {
    this.logic = this.context.$element.data('logic') != null;
    if (this.logic) {
      this.insertPlaceholder();
    }
    if (this.update) {
      this.pushBinding();
    }
  }

  Base.prototype.pushBinding = function() {
    if (this.context.$element.data('static') == null) {
      return Recoil.bindings.read.push(this);
    }
  };

  Base.prototype.parseBinding = function(binding, evalFunction) {
    var jsBinding, _ref;

    if (evalFunction == null) {
      evalFunction = true;
    }
    if ((_ref = this.cachedBindings) == null) {
      this.cachedBindings = {};
    }
    jsBinding = this.cachedBindings[binding];
    if (jsBinding) {
      return jsBinding.call(this);
    }
    this.cachedBindings[binding] = this.generateFunction(binding);
    if (evalFunction) {
      return this.cachedBindings[binding].call(this);
    } else {
      return this.cachedBindings[binding];
    }
  };

  Base.prototype.parseString = function(str) {
    var jsString, _ref;

    if ((_ref = this.cachedStrings) == null) {
      this.cachedStrings = {};
    }
    jsString = this.cachedStrings[str];
    if (jsString) {
      return jsString.call(this);
    }
    str = str.replace(/\"/g, '\\"');
    str = '"' + str + '"';
    this.cachedStrings[str] = this.generateFunction(str);
    return this.cachedStrings[str].call(this);
  };

  Base.prototype.generateFunction = function(str, customArgs) {
    var argHash, args, js, key, scopeArgs, value;

    if (customArgs == null) {
      customArgs = [];
    }
    js = Recoil.compile("" + str);
    argHash = {
      '$element': 'this.context.$element',
      '$root': 'this.context.root',
      '$parent': 'this.context.parent',
      '$data': 'this.context.scope',
      '$scope': 'this.context.scope',
      '$extras': 'this.context.extras'
    };
    args = [];
    scopeArgs = [];
    for (key in this.context.scope) {
      if (isNaN(key)) {
        argHash[key] = "this.context.scope[ '" + key + "' ]";
      }
    }
    for (key in this.context.extras) {
      if (isNaN(key)) {
        argHash[key] = "this.context.extras[ '" + key + "' ]";
      }
    }
    for (key in argHash) {
      value = argHash[key];
      args.push(key);
      scopeArgs.push(value);
    }
    return eval("( function ( " + (customArgs.join(',')) + " ) {\n  return ( function ( " + (args.join(',')) + " ) {\n    return " + js + "\n  } ).call( {}, " + (scopeArgs.join(', ')) + " )\n} )");
  };

  Base.prototype.updateBinding = function(value, binding) {
    var part, parts, scope;

    if (binding == null) {
      binding = this.binding;
    }
    parts = binding.split('.');
    part = parts.pop();
    scope = this.parseBinding(parts.join('.')) || this.context.scope;
    if (typeof scope[part] === 'function') {
      return scope[part](value);
    } else {
      return scope[part] = value;
    }
  };

  Base.prototype.insertPlaceholder = function() {
    var attr, str;

    if (this.context.$placeholder) {
      return;
    }
    str = ((function() {
      var _i, _len, _ref, _results;

      _ref = this.context.$element.get(0).attributes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        _results.push("" + attr.nodeName + "='" + attr.value + "'");
      }
      return _results;
    }).call(this)).join(' ');
    this.context.$placeholder = $("<!-- Start Recoil Block: " + str + " -->").insertBefore(this.context.$element);
    return $("<!-- End Recoil Block: " + str + " -->").insertAfter(this.context.$element);
  };

  Base.prototype.wrap = function() {
    if (!this.context.unwrapped) {
      return;
    }
    this.context.unwrapped = false;
    this.context.$contents.eq(0).before(this.context.$element);
    return this.context.$element.append(this.context.$contents);
  };

  Base.prototype.unwrap = function() {
    if (this.context.unwrapped) {
      return;
    }
    this.context.unwrapped = true;
    this.context.$contents = this.context.$element.contents().insertAfter(this.context.$element);
    return this.context.$element.detach();
  };

  return Base;

})();

var AttributeText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AttributeText = (function(_super) {
  __extends(AttributeText, _super);

  function AttributeText(context, attribute) {
    this.context = context;
    this.attribute = attribute;
    if (!this.attribute) {
      return this.parseAttributes();
    }
    this.template = this.attribute.nodeValue;
    if (this.attribute.nodeName.match(/^data/)) {
      return;
    }
    if (!this.template.match('{')) {
      return;
    }
    this.updateValue();
    this.pushBinding();
  }

  AttributeText.prototype.parseAttributes = function() {
    var attribute, _i, _len, _ref, _results;

    _ref = this.context.$element.get(0).attributes || [];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attribute = _ref[_i];
      _results.push(new AttributeText(this.context, attribute));
    }
    return _results;
  };

  AttributeText.prototype.updateValue = function() {
    var value;

    value = this.parseString(this.template);
    if (this.value !== value) {
      this.value = value;
      return this.attribute.nodeValue = value;
    }
  };

  AttributeText.prototype.update = function() {
    return this.updateValue();
  };

  return AttributeText;

})(Base);

var ComposeBinding,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ComposeBinding = (function(_super) {
  __extends(ComposeBinding, _super);

  function ComposeBinding(context) {
    var _ref;

    this.context = context;
    this.renderView = __bind(this.renderView, this);
    if (!(this.binding = this.context.$element.data('compose'))) {
      return;
    }
    if (this.binding) {
      this.controller = this.parseBinding(this.binding);
    }
    this.view = this.context.$element.data('view') || ((_ref = this.controller) != null ? _ref.view : void 0);
    this.loadView();
    ComposeBinding.__super__.constructor.apply(this, arguments);
  }

  ComposeBinding.prototype.loadView = function() {
    var url,
      _this = this;

    url = "" + Recoil.viewPath + "/" + this.view + ".html";
    if (Recoil.views[url]) {
      return this.renderView(Recoil.views[url]);
    }
    return $.ajax({
      url: url,
      success: function(data) {
        data = Recoil.views[url] = data.replace(/<\$/g, '<div data-logic="true"').replace(/<\/\$>/g, '</div>');
        return _this.renderView(data);
      }
    });
  };

  ComposeBinding.prototype.renderView = function(data) {
    var intro, _ref, _ref1;

    if (data == null) {
      data = this.html;
    }
    this.html = data;
    this.context.$element.html(this.html);
    DirtyCheck.cleanBindings();
    this.parseChildren();
    if ((_ref = this.controller) != null) {
      if (typeof _ref.afterRender === "function") {
        _ref.afterRender(this.context.$element, this.context.parent, this.context.root);
      }
    }
    intro = Recoil.transitions.intro[this.view] || ((_ref1 = this.controller) != null ? _ref1.intro : void 0) || null;
    return typeof intro === "function" ? intro(this.context.$element) : void 0;
  };

  ComposeBinding.prototype.parseChildren = function() {
    var _this = this;

    return this.context.$element.contents().each(function(index, element) {
      return new Parser({
        $element: $(element),
        scope: _this.controller,
        parent: _this.context.scope,
        root: _this.context.root,
        extras: _this.context.extras
      });
    });
  };

  ComposeBinding.prototype.update = function() {
    var callback, outro, _ref,
      _this = this;

    if (this.controller !== controller) {
      callback = function() {
        _this.controller = controller;
        _this.view = _this.controller.view;
        return _this.loadView();
      };
      outro = Recoil.transitions.outro[this.view] || ((_ref = this.controller) != null ? _ref.outro : void 0) || null;
      return (typeof outro === "function" ? outro(this.context.$element, callback) : void 0) || callback();
    }
  };

  return ComposeBinding;

})(Base);

var ContextBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ContextBinding = (function(_super) {
  __extends(ContextBinding, _super);

  function ContextBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('context'))) {
      return;
    }
    this.setValue();
    ContextBinding.__super__.constructor.apply(this, arguments);
  }

  ContextBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      return this.setChildContext();
    }
  };

  ContextBinding.prototype.setChildContext = function() {
    return this.context.childContext = {
      scope: this.value,
      parent: this.context.scope
    };
  };

  ContextBinding.prototype.update = function() {
    return this.setValue();
  };

  return ContextBinding;

})(Base);

var CSSBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CSSBinding = (function(_super) {
  __extends(CSSBinding, _super);

  function CSSBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('css'))) {
      return;
    }
    this.updateCSS();
    CSSBinding.__super__.constructor.apply(this, arguments);
  }

  CSSBinding.prototype.updateCSS = function() {
    var cssString;

    this.css = this.parseBinding(this.binding);
    cssString = JSON.stringify(this.css);
    if (this.cssString === cssString) {
      return;
    }
    return this.context.$element.css(this.css);
  };

  CSSBinding.prototype.update = function() {
    return this.updateCSS();
  };

  return CSSBinding;

})(Base);

var EventBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventBinding = (function(_super) {
  __extends(EventBinding, _super);

  function EventBinding(context, eventName) {
    var csString, func, str,
      _this = this;

    this.context = context;
    if (!eventName) {
      return this.parseEvents();
    }
    str = this.context.$element.data(eventName);
    csString = "" + str;
    func = this.parseBinding(csString, false);
    eventName = "" + eventName + ".recoil";
    this.context.$element.off(eventName).on(eventName, function(event) {
      var ret, _ref;

      ret = func.call(_this, event);
      if (typeof ret === 'function') {
        return ret(event, ((_ref = _this.context.extras) != null ? _ref.item : void 0) || _this.context.scope);
      } else {
        return ret;
      }
    });
  }

  EventBinding.prototype.parseEvents = function() {
    var event, str, _i, _len, _ref, _results;

    _ref = Recoil.events;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      str = this.context.$element.data(event);
      if (!str) {
        continue;
      }
      _results.push(new EventBinding(this.context, event));
    }
    return _results;
  };

  EventBinding.prototype.generateFunction = function(str) {
    return EventBinding.__super__.generateFunction.call(this, str, ['$event']);
  };

  return EventBinding;

})(Base);

var ForBinding,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ForBinding = (function(_super) {
  __extends(ForBinding, _super);

  function ForBinding(context) {
    this.context = context;
    this.checkForChanges = __bind(this.checkForChanges, this);
    if (!(this.binding = this.context.$element.data('for'))) {
      return;
    }
    this.context.stopParsing = true;
    this.getParts();
    this.getTemplate();
    this.parseItems();
    ForBinding.__super__.constructor.apply(this, arguments);
  }

  ForBinding.prototype.getParts = function() {
    var condition, itemParts, parts;

    parts = this.binding.split(/\s+in\s+|\s+when\s+/g);
    itemParts = parts[0].split(',');
    this.itemName = $.trim(itemParts[0]);
    this.indexName = $.trim(itemParts[1]);
    this.collectionName = $.trim(parts[1]);
    condition = $.trim(parts[2] || 'true');
    return this.conditionFunction = this.parseBinding(condition, false);
  };

  ForBinding.prototype.getTemplate = function() {
    return this.$template = this.context.$element.contents().remove();
  };

  ForBinding.prototype.getCollection = function() {
    var index, item, items, key;

    items = this.parseBinding(this.collectionName);
    items = typeof items === 'function' ? items() : items;
    if (items instanceof Array) {
      items = (function() {
        var _i, _len, _results;

        _results = [];
        for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
          item = items[index];
          if (this.conditionFunction.call(this, item, index)) {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
    } else {
      for (item in items) {
        key = items[item];
        if (!this.conditionFunction.call(this, item, key)) {
          delete items[key];
        }
      }
    }
    return items;
  };

  ForBinding.prototype.parseItems = function(collection) {
    var index, item, _i, _len, _results, _results1;

    if (collection == null) {
      collection = this.getCollection();
    }
    if (collection instanceof Array) {
      _results = [];
      for (index = _i = 0, _len = collection.length; _i < _len; index = ++_i) {
        item = collection[index];
        _results.push(this.parseItem(item, index, collection));
      }
      return _results;
    } else {
      _results1 = [];
      for (index in collection) {
        item = collection[index];
        _results1.push(this.parseItem(item, index, collection));
      }
      return _results1;
    }
  };

  ForBinding.prototype.parseItem = function(item, index, collection) {
    var $item, extras;

    $item = this.$template.clone().appendTo(this.context.$element);
    extras = $.extend({}, this.context.extras);
    if (typeof item === 'object') {
      extras.itemName = this.itemName;
      extras.$item = item;
      extras[this.itemName] = item;
      extras[this.itemName].$index = index;
      extras[this.itemName].$total = collection.length;
    } else {
      extras[this.itemName] = item;
    }
    if (this.indexName) {
      extras[this.indexName] = index;
    }
    DirtyCheck.cleanBindings();
    return new Parser({
      $element: $item,
      scope: this.context.scope,
      parent: this.context.parent,
      root: this.context.root,
      extras: extras
    });
  };

  ForBinding.prototype.generateFunction = function(str) {
    var args;

    args = [this.itemName];
    if (this.indexName) {
      args.push(this.indexName);
    }
    return ForBinding.__super__.generateFunction.call(this, str, args);
  };

  ForBinding.prototype.checkForChanges = function(collection) {
    var index, item, _i, _len, _ref;

    return true;
    if (!this.collection) {
      return true;
    }
    if (collection.length !== this.collection.length) {
      return true;
    }
    _ref = collection || [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      item = _ref[index];
      if (item !== this.collection[index]) {
        return true;
      }
    }
    return false;
  };

  ForBinding.prototype.updateItems = function() {
    var collection;

    collection = this.getCollection();
    if (!this.checkForChanges(collection)) {
      return;
    }
    this.collection = collection.slice(0);
    if (this.logic) {
      this.wrap();
    }
    this.context.$element.empty();
    this.parseItems(collection);
    if (this.logic) {
      return this.unwrap();
    }
  };

  ForBinding.prototype.update = function() {
    return this.updateItems();
  };

  return ForBinding;

})(Base);

var HTMLBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HTMLBinding = (function(_super) {
  __extends(HTMLBinding, _super);

  function HTMLBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('html'))) {
      return;
    }
    this.setValue();
    this.pushBinding();
  }

  HTMLBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      return this.context.$element.html(this.value);
    }
  };

  HTMLBinding.prototype.update = function() {
    return this.setValue();
  };

  return HTMLBinding;

})(Base);

var IfBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

IfBinding = (function(_super) {
  __extends(IfBinding, _super);

  function IfBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('if'))) {
      return;
    }
    this.update();
    this.insertPlaceholder();
    IfBinding.__super__.constructor.apply(this, arguments);
  }

  IfBinding.prototype.setValue = function() {
    if (this.value) {
      delete this.context.stopParsing;
      return this.context.$element.insertAfter(this.context.$placeholder);
    } else {
      this.context.stopParsing = true;
      this.context.skipBindings = true;
      this.context.$element.detach();
      return DirtyCheck.cleanBindings();
    }
  };

  IfBinding.prototype.update = function() {
    var value;

    value = !!this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      this.wrap();
      this.setValue();
      return this.unwrap();
    }
  };

  return IfBinding;

})(Base);

var TextNode,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextNode = (function(_super) {
  __extends(TextNode, _super);

  function TextNode(context) {
    this.context = context;
    if (this.context.$element.get(0).nodeType !== 3) {
      return;
    }
    if (!(this.template = this.context.$element.text())) {
      return;
    }
    if (!(this.template.indexOf('{') + 1)) {
      return;
    }
    this.context.stopParsing = true;
    this.context.skipBindings = true;
    this.element = this.context.$element.get(0);
    this.updateValue();
    TextNode.__super__.constructor.apply(this, arguments);
  }

  TextNode.prototype.updateValue = function() {
    var value;

    value = this.parseString(this.template);
    if (this.value !== value) {
      return this.element.nodeValue = this.value = value;
    }
  };

  TextNode.prototype.update = function() {
    return this.updateValue();
  };

  return TextNode;

})(Base);

var UpdateBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UpdateBinding = (function(_super) {
  __extends(UpdateBinding, _super);

  function UpdateBinding(context) {
    var binding, csString;

    this.context = context;
    if (!(binding = this.context.$element.data('update'))) {
      return;
    }
    csString = "-> " + binding;
    this.func = this.parseBinding(csString);
    this.func();
    UpdateBinding.__super__.constructor.apply(this, arguments);
  }

  UpdateBinding.prototype.update = function() {
    return this.func();
  };

  return UpdateBinding;

})(Base);

var ValueBinding,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ValueBinding = (function(_super) {
  __extends(ValueBinding, _super);

  function ValueBinding(context) {
    this.context = context;
    this.updateHandler = __bind(this.updateHandler, this);
    if (!(this.binding = this.context.$element.data('value'))) {
      return;
    }
    this.context.stopParsing = true;
    this.live = this.context.$element.data('live') != null;
    this.setValue();
    if (this.context.$element.is('select')) {
      this.updateHandler();
    }
    this.bindEvents();
    ValueBinding.__super__.constructor.apply(this, arguments);
    Recoil.bindings.write.push(this);
  }

  ValueBinding.prototype.bindEvents = function() {
    switch (this.context.$element.attr('type')) {
      case 'radio':
      case 'checkbox':
        return this.context.$element.on('change', this.updateHandler);
    }
  };

  ValueBinding.prototype.getValue = function() {
    var value;

    if (this.context.$element.attr('type') === 'radio') {
      if (!this.context.$element.is(':checked')) {
        return;
      }
    }
    value = this.parseBinding(this.binding);
    return value = (typeof value === "function" ? value() : void 0) || value;
  };

  ValueBinding.prototype.setValue = function() {
    var value;

    value = this.getValue();
    if (this.value !== value) {
      this.value = value;
      switch (this.context.$element.attr('type')) {
        case 'checkbox':
          return this.context.$element.prop('checked', value);
        case 'radio':
          break;
        default:
          return this.context.$element.val(this.value);
      }
    }
  };

  ValueBinding.prototype.updateHandler = function() {
    var value;

    if (this.context.$element.is(':radio') && !this.context.$element.is(':checked')) {
      return;
    }
    value = (function() {
      switch (this.context.$element.attr('type')) {
        case 'checkbox':
          return this.context.$element.prop('checked');
        default:
          return this.context.$element.val();
      }
    }).call(this);
    if (this.value !== value) {
      return this.updateBinding(this.value = value);
    }
  };

  ValueBinding.prototype.update = function() {
    return this.setValue();
  };

  ValueBinding.prototype.write = function() {
    if (this.context.$element.is(':focus') && !this.live) {
      return;
    }
    return this.updateHandler();
  };

  return ValueBinding;

})(Base);

var VisibleBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

VisibleBinding = (function(_super) {
  __extends(VisibleBinding, _super);

  function VisibleBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('visible'))) {
      return;
    }
    this.setValue();
    VisibleBinding.__super__.constructor.apply(this, arguments);
  }

  VisibleBinding.prototype.setValue = function() {
    var value;

    value = !!this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      if (this.value) {
        return this.context.$element.show();
      } else {
        return this.context.$element.hide();
      }
    }
  };

  VisibleBinding.prototype.update = function() {
    return this.setValue();
  };

  return VisibleBinding;

})(Base);

var Parser;

Parser = (function() {
  Parser.prototype.bindings = [TextNode, AttributeText, EventBinding, ContextBinding, CSSBinding, VisibleBinding, IfBinding, ComposeBinding, ForBinding, HTMLBinding, ValueBinding, UpdateBinding];

  function Parser(context) {
    var _this = this;

    this.context = context;
    this.context.$element.each(function(index, element) {
      var $element;

      $element = $(element);
      return _this.parseNode($element);
    });
  }

  Parser.prototype.parseNode = function($element) {
    var $contents, binding, context, _i, _len, _ref,
      _this = this;

    context = $.extend({}, this.context);
    context.$element = $element;
    _ref = this.bindings;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      binding = _ref[_i];
      new binding(context);
      if (context.skipBindings) {
        break;
      }
    }
    if (context.stopParsing) {
      return;
    }
    $contents = context.$contents || $element.contents();
    return $contents.each(function(index, element) {
      return new Parser($.extend({}, context, context.childContext, {
        $element: $(element)
      }));
    });
  };

  return Parser;

})();

var Core,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Core = (function() {
  function Core($element, controller) {
    this.$element = $element;
    this.controller = controller;
    this.afterRender = __bind(this.afterRender, this);
    this.checkForLogicTags();
    this.afterRender();
  }

  Core.prototype.checkForLogicTags = function() {
    var html;

    html = this.$element.html();
    if (!(html.indexOf('&lt;$') + 1)) {
      return;
    }
    html = html.replace(/&lt;\$(.*)&gt;/g, function(match, contents) {
      return "<div data-logic " + contents + ">";
    });
    html = html.replace(/<!--\$-->/g, '</div>');
    return this.$element.html(html);
  };

  Core.prototype.afterRender = function() {
    if (this.controller.view) {
      this.$element.data('compose', '$scope');
    }
    return new Parser({
      $element: this.$element,
      scope: this.controller,
      root: this.controller
    });
  };

  return Core;

})();
if ( typeof define === 'function' && define.amd ) define( Recoil )
else root.Recoil = Recoil
} )( this, jQuery )