/*! BoringJS (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/BoringJS */
/*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
(function($){

(function() {
  $.fn.makeBoring = function(controller) {
    var $element;

    if (globals.app) {
      throw 'You may only have one app running at a time.';
    }
    $element = $(this);
    return globals.app = new Core($element, controller);
  };
  $.makeBoring = function(id, controller) {
    if (globals.app) {
      throw 'You may only have one app running at a time.';
    }
    return $(function() {
      return $("[data-app='" + id + "']:first").makeBoring(controller);
    });
  };
  return $.boring = {
    createTransition: function(type, id, callback) {
      return globals.transitions[type][id] = callback;
    }
  };
})();

var globals;

globals = {
  app: null,
  bindings: [],
  views: {},
  transitions: {
    intro: {},
    outro: {}
  },
  events: 'blur focus focusin focusout load resize scroll unload click\ndblclick mousedown mouseup mousemove mouseover mouseout mouseenter\nmouseleave change select submit keydown keypress keyup error'.split(/\s+/g),
  attributes: 'class id src href style'.split(/\s+/g)
};

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
            var _ref;

            listener.apply(null, arguments);
            return (_ref = globals.app) != null ? _ref.checkForChanges() : void 0;
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
            var _ref;

            listener.apply(null, arguments);
            return (_ref = globals.app) != null ? _ref.checkForChanges() : void 0;
          };
          return originalMethod.apply(this, args);
        };
      }
    }
  })();
  return $(function() {
    $(document).ajaxComplete(function() {
      var _ref;

      return (_ref = globals.app) != null ? _ref.checkForChanges() : void 0;
    });
    return $(document).on('keydown click', function() {
      var _ref;

      return (_ref = globals.app) != null ? _ref.checkForChanges() : void 0;
    });
  });
})();

var Base;

Base = (function() {
  function Base($element) {
    this.$element = $element;
    this.logic = this.$element.data('logic');
    if (this.logic) {
      this.insertPlaceholder();
      this.unwrap();
    }
    if (this.update) {
      this.pushBinding();
    }
  }

  Base.prototype.pushBinding = function() {
    return globals.bindings.push(this);
  };

  Base.prototype.parseBinding = function(binding) {
    var jsBinding, _ref;

    if ((_ref = this.cachedBindings) == null) {
      this.cachedBindings = {};
    }
    jsBinding = this.cachedBindings[binding];
    if (jsBinding) {
      return jsBinding.call(this);
    }
    this.cachedBindings[binding] = this.generateFunction(binding);
    return this.cachedBindings[binding].call(this);
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

  Base.prototype.generateFunction = function(str) {
    var args, js, key, scopeArgs;

    js = CoffeeScript.compile("do -> " + str, {
      bare: true
    });
    args = [];
    scopeArgs = [];
    for (key in this.scope) {
      if (!(isNaN(key))) {
        continue;
      }
      args.push(key);
      scopeArgs.push("this.scope." + key);
    }
    args.push('$root, $parent, $scope');
    scopeArgs.push('this.root, this.parent, this.scope');
    return eval("( function () {\n  return ( function ( " + (args.join(',')) + " ) {\n    return " + js + "\n  } ).call( {}, " + (scopeArgs.join(', ')) + " )\n} )");
  };

  Base.prototype.updateBinding = function(value, binding) {
    var part, parts, scope;

    if (binding == null) {
      binding = this.binding;
    }
    parts = binding.split('.');
    part = parts.pop();
    scope = this.parseBinding(parts.join('.')) || this.scope;
    return (typeof scope[part] === "function" ? scope[part](value) : void 0) || (scope[part] = value);
  };

  Base.prototype.insertPlaceholder = function() {
    var attr, str;

    str = ((function() {
      var _i, _len, _ref, _results;

      _ref = this.$element.get(0).attributes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        _results.push("" + attr.nodeName + "='" + attr.value + "'");
      }
      return _results;
    }).call(this)).join(' ');
    this.$placeholder = $("<!-- Start BoringJS Block: " + str + " -->").insertBefore(this.$element);
    return $("<!-- End BoringJS Block: " + str + " -->").insertAfter(this.$element);
  };

  Base.prototype.wrap = function() {
    if (!this.unwrapped) {
      return;
    }
    this.unwrapped = false;
    this.$contents.eq(0).before(this.$element);
    return this.$element.append(this.$contents);
  };

  Base.prototype.unwrap = function() {
    if (!this.unwrapped) {
      this.unwrapped = true;
    }
    this.$contents = this.$element.contents().insertAfter(this.$element);
    return this.$element.detach();
  };

  return Base;

})();

var AttributeText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AttributeText = (function(_super) {
  __extends(AttributeText, _super);

  function AttributeText(attribute, $element, scope, parent, root) {
    this.attribute = attribute;
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
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

var AttributeBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AttributeBinding = (function(_super) {
  __extends(AttributeBinding, _super);

  function AttributeBinding(attribute, $element, scope, parent, root) {
    this.attribute = attribute;
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.binding = this.$element.data(this.attribute);
    this.setValue();
    this.pushBinding();
  }

  AttributeBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      return this.$element.attr(this.attribute, this.value);
    }
  };

  AttributeBinding.prototype.update = function() {
    return this.setValue();
  };

  return AttributeBinding;

})(Base);

var ComposeBinding,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ComposeBinding = (function(_super) {
  __extends(ComposeBinding, _super);

  function ComposeBinding($element, scope, parent, root, childParser) {
    var _ref;

    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root != null ? root : this.scope;
    this.childParser = childParser;
    this.renderView = __bind(this.renderView, this);
    this.binding = this.$element.data('compose');
    this.controller = this.parseBinding(this.binding);
    this.view = (_ref = this.controller) != null ? _ref.view : void 0;
    this.loadView();
    this.pushBinding();
  }

  ComposeBinding.prototype.loadView = function() {
    var url,
      _this = this;

    url = "/views/" + this.view + ".html";
    if (globals.views[url]) {
      return this.renderView(globals.views[url]);
    }
    return $.ajax({
      url: url,
      success: function(data) {
        data = globals.views[url] = data.replace(/<\$/g, '<div data-logic="true"').replace(/<\/\$>/g, '</div>');
        return _this.renderView(data);
      }
    });
  };

  ComposeBinding.prototype.renderView = function(data) {
    var intro, _base, _ref;

    if (data == null) {
      data = this.html;
    }
    this.html = data;
    this.$element.html(this.html);
    this.childParser(this.$element.children(), this.controller, this.scope, this.root);
    if (typeof (_base = this.controller).afterRender === "function") {
      _base.afterRender({
        $dom: this.$element,
        scope: this.scope,
        parent: this.parent,
        root: this.root
      });
    }
    intro = globals.transitions.intro[this.view] || ((_ref = this.controller) != null ? _ref.intro : void 0) || null;
    return typeof intro === "function" ? intro(this.$element) : void 0;
  };

  ComposeBinding.prototype.update = function() {
    var callback, controller, outro, _ref,
      _this = this;

    controller = this.parseBinding(this.binding);
    if (this.controller !== controller) {
      callback = function() {
        _this.controller = controller;
        _this.view = _this.controller.view;
        return _this.loadView();
      };
      outro = globals.transitions.outro[this.view] || ((_ref = this.controller) != null ? _ref.outro : void 0) || null;
      return (typeof outro === "function" ? outro(this.$element, callback) : void 0) || callback();
    }
  };

  return ComposeBinding;

})(Base);

var CSSBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CSSBinding = (function(_super) {
  __extends(CSSBinding, _super);

  function CSSBinding($element, scope, parent, root) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.binding = this.$element.data('css');
    this.css = this.parseBinding(this.binding);
    this.$element.css(this.css);
  }

  return CSSBinding;

})(Base);

var EachBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EachBinding = (function(_super) {
  __extends(EachBinding, _super);

  function EachBinding($element, scope, parent, root, childParser) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.childParser = childParser;
    this.binding = this.$element.data('each');
    this.getTemplate();
    this.parseItems();
    EachBinding.__super__.constructor.apply(this, arguments);
  }

  EachBinding.prototype.getTemplate = function() {
    return this.$template = this.$element.contents().remove();
  };

  EachBinding.prototype.getItems = function() {
    var items;

    items = this.parseBinding(this.binding);
    return ((typeof items === "function" ? items() : void 0) || items).slice(0);
  };

  EachBinding.prototype.parseItems = function(items) {
    var $item, index, item, scope, _i, _len, _ref, _results;

    this.items = items != null ? items : this.getItems();
    _ref = this.items;
    _results = [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      item = _ref[index];
      $item = this.$template.clone().appendTo(this.$element);
      scope = $.extend({}, this.scope);
      scope.$index = index;
      scope.$total = this.items.length;
      _results.push(this.childParser($item, item, this.scope, this.root));
    }
    return _results;
  };

  EachBinding.prototype.updateItems = function() {
    var items;

    items = this.getItems();
    if (this.items === items) {
      return;
    }
    if (JSON.stringify(this.items) === JSON.stringify(items)) {
      return;
    }
    if (this.logic) {
      this.wrap();
    }
    this.$element.empty();
    this.parseItems(items);
    if (this.logic) {
      return this.unwrap();
    }
  };

  EachBinding.prototype.update = function() {
    return this.updateItems();
  };

  return EachBinding;

})(Base);

var EventBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventBinding = (function(_super) {
  __extends(EventBinding, _super);

  function EventBinding(eventName, $element, scope, parent, root) {
    var csString, func, str,
      _this = this;

    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    str = $element.data(eventName);
    csString = "-> " + str;
    func = this.parseBinding(csString);
    eventName = "" + eventName + ".boringjs";
    $element.off(eventName).on(eventName, function(event) {
      return func.call(_this, event);
    });
  }

  EventBinding.prototype.generateFunction = function(str) {
    var args, js, key, scopeArgs;

    js = CoffeeScript.compile("do -> " + str, {
      bare: true
    });
    args = [];
    scopeArgs = [];
    for (key in this.scope) {
      if (!(isNaN(key))) {
        continue;
      }
      args.push(key);
      scopeArgs.push("this.scope." + key);
    }
    args.push('$root, $parent, $data');
    scopeArgs.push('this.root, this.parent, this.scope');
    return eval("( function ( event ) {\n  return ( function ( " + (args.join(',')) + " ) {\n    return " + js + "\n  } ).call( {}, " + (scopeArgs.join(', ')) + " )\n} )");
  };

  return EventBinding;

})(Base);

var ForBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ForBinding = (function(_super) {
  __extends(ForBinding, _super);

  function ForBinding($element, scope, parent, root, childParser) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.childParser = childParser;
    this.binding = this.$element.data('for');
    this.parts = this.binding.split('in');
    this.itemName = $.trim(this.parts[0]);
    this.collectionName = $.trim(this.parts[1]);
    this.getTemplate();
    this.parseItems();
    ForBinding.__super__.constructor.apply(this, arguments);
  }

  ForBinding.prototype.getTemplate = function() {
    return this.$template = this.$element.contents().remove();
  };

  ForBinding.prototype.getCollection = function() {
    var items;

    items = this.parseBinding(this.collectionName);
    return ((typeof items === "function" ? items() : void 0) || items).slice(0);
  };

  ForBinding.prototype.parseItems = function(collection) {
    var $item, index, item, scope, _i, _len, _ref, _results;

    this.collection = collection != null ? collection : this.getCollection(collection);
    _ref = this.collection;
    _results = [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      item = _ref[index];
      $item = this.$template.clone().appendTo(this.$element);
      scope = $.extend({}, this.scope);
      if (typeof item === 'object') {
        scope[this.itemName] = $.extend({}, item);
        scope[this.itemName].$index = index;
        scope[this.itemName].$total = this.collection.length;
      } else {
        scope[this.itemName] = item;
      }
      _results.push(this.childParser($item, scope, this.parent, this.root));
    }
    return _results;
  };

  ForBinding.prototype.updateItems = function() {
    var collection;

    collection = this.getCollection();
    if (this.collection === collection) {
      return;
    }
    if (JSON.stringify(this.collection) === JSON.stringify(collection)) {
      return;
    }
    if (this.logic) {
      this.wrap();
    }
    this.$element.empty();
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

  function HTMLBinding($element, scope, parent, root) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.binding = this.$element.data('html');
    this.setValue();
    this.pushBinding();
  }

  HTMLBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      return this.$element.html(this.value);
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

  function IfBinding($element, scope, parent, root, callback) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.callback = callback;
    this.binding = this.$element.data('if');
    this.insertPlaceholder();
    this.setValue();
    this.pushBinding();
  }

  IfBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      if (this.value) {
        this.$element.insertAfter(this.$placeholder);
        this.callback(this.$element.contents(), this.scope, this.parent, this.root);
        return this.unwrap();
      } else {
        this.wrap();
        return this.$element.detach();
      }
    }
  };

  IfBinding.prototype.update = function() {
    return this.setValue();
  };

  return IfBinding;

})(Base);

var TextNode,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextNode = (function(_super) {
  __extends(TextNode, _super);

  function TextNode($element, scope, parent, root) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.template = this.$element.text();
    if (!(this.template.indexOf('{') + 1)) {
      return;
    }
    this.element = this.$element.get(0);
    this.updateValue();
    this.pushBinding();
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

var TextBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextBinding = (function(_super) {
  __extends(TextBinding, _super);

  function TextBinding($element, scope, parent, root) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.binding = this.$element.data('text');
    this.setValue();
    this.pushBinding();
  }

  TextBinding.prototype.setValue = function() {
    var value;

    value = this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      return this.$element.text(this.value);
    }
  };

  TextBinding.prototype.update = function() {
    return this.setValue();
  };

  return TextBinding;

})(Base);

var UnlessBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UnlessBinding = (function(_super) {
  __extends(UnlessBinding, _super);

  function UnlessBinding($element, scope, parent, root, callback) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.callback = callback;
    this.binding = this.$element.data('if');
    this.insertPlaceholder();
    this.setValue();
    this.pushBinding();
  }

  UnlessBinding.prototype.setValue = function() {
    var value;

    value = !this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      if (this.value) {
        this.$element.insertAfter(this.$placeholder);
        return this.unwrap();
      } else {
        this.wrap();
        return this.$element.detach();
      }
    }
  };

  UnlessBinding.prototype.update = function() {
    return this.setValue();
  };

  return UnlessBinding;

})(Base);

var UpdateBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UpdateBinding = (function(_super) {
  __extends(UpdateBinding, _super);

  function UpdateBinding($element, scope, parent, root) {
    var binding, csString;

    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    binding = this.$element.data('update');
    csString = "-> " + binding;
    this.func = this.parseBinding(csString);
    this.func();
    this.pushBinding();
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

  function ValueBinding($element, scope, parent, root) {
    this.$element = $element;
    this.scope = scope;
    this.parent = parent;
    this.root = root;
    this.updateHandler = __bind(this.updateHandler, this);
    this.binding = this.$element.data('value');
    this.live = this.$element.data('live') != null;
    this.setValue();
    this.pushBinding();
    if (this.$element.is('select')) {
      this.updateHandler();
    }
    if (!this.live) {
      this.$element.on('blur', this.updateHandler);
    }
  }

  ValueBinding.prototype.getValue = function() {
    var value;

    if (this.$element.attr('type') === 'radio') {
      if (!this.$element.is(':checked')) {
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
      if (!this.$element.is('input:radio')) {
        return this.$element.val(this.value);
      }
    }
  };

  ValueBinding.prototype.updateHandler = function() {
    if (this.$element.is(':radio') && !this.$element.is(':checked')) {
      return;
    }
    this.value = (function() {
      switch (this.$element.attr('type')) {
        case 'checkbox':
          return this.$element.prop('checked');
        default:
          return this.$element.val();
      }
    }).call(this);
    return this.updateBinding(this.value);
  };

  ValueBinding.prototype.update = function() {
    if (this.$element.is(':focus') && this.getValue() === this.value && this.live) {
      return this.updateHandler();
    } else {
      return this.setValue();
    }
  };

  return ValueBinding;

})(Base);

var Parser;

Parser = (function() {
  function Parser($dom, scope, parent, root) {
    var _this = this;

    this.scope = scope;
    this.parent = parent;
    this.root = root;
    $dom.each(function(index, element) {
      var $element;

      $element = $(element);
      return _this.parseNode($element);
    });
  }

  Parser.prototype.parseNode = function($element) {
    var parseChildren,
      _this = this;

    parseChildren = true;
    this.attachEvents($element);
    this.parseAttributes($element);
    if ($element.get(0).nodeType === 3) {
      new TextNode($element, this.scope, this.parent, this.root);
      return;
    }
    if ($element.data('css')) {
      new CSSBinding($element, this.scope, this.parent, this.root);
    }
    if ($element.data('if') != null) {
      parseChildren = false;
      new IfBinding($element, this.scope, this.parent, this.root, function($element) {
        return new Parser($element, _this.scope, _this.parent, _this.root);
      });
    }
    if ($element.data('unless') != null) {
      parseChildren = false;
      new UnlessBinding($element, this.scope, this.parent, this.root, function($element) {
        return new Parser($element, _this.scope, _this.parent, _this.root);
      });
    }
    if ($element.data('compose')) {
      parseChildren = false;
      new ComposeBinding($element, this.scope, this.parent, this.root, function($element, scope, parent, root) {
        return new Parser($element, scope, parent, root);
      });
    }
    if ($element.data('for')) {
      parseChildren = false;
      new ForBinding($element, this.scope, this.parent, this.root, function($element, scope, parent, root) {
        return new Parser($element, scope, parent, root);
      });
    }
    if ($element.data('each')) {
      parseChildren = false;
      new EachBinding($element, this.scope, this.parent, this.root, function($element, scope, parent, root) {
        return new Parser($element, scope, parent, root);
      });
    }
    if ($element.data('text')) {
      parseChildren = false;
      new TextBinding($element, this.scope, this.parent, this.root);
    }
    if ($element.data('html')) {
      new HTMLBinding($element, this.scope, this.parent, this.root);
    }
    if ($element.data('value')) {
      parseChildren = false;
      new ValueBinding($element, this.scope, this.parent, this.root);
    }
    if ($element.data('update')) {
      new UpdateBinding($element, this.scope, this.parent, this.root);
    }
    if (!parseChildren) {
      return;
    }
    return $element.contents().each(function(index, element) {
      $element = $(element);
      return _this.parseNode($element);
    });
  };

  Parser.prototype.parseAttributes = function($element) {
    var attribute, str, _i, _j, _len, _len1, _ref, _ref1, _results;

    _ref = globals.attributes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attribute = _ref[_i];
      str = $element.data(attribute);
      if (!str) {
        continue;
      }
      new AttributeBinding(attribute, $element, this.scope, this.parent, this.root);
    }
    _ref1 = $element.get(0).attributes || [];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      attribute = _ref1[_j];
      _results.push(new AttributeText(attribute, $element, this.scope, this.parent, this.root));
    }
    return _results;
  };

  Parser.prototype.attachEvents = function($element) {
    var event, str, _i, _len, _ref, _results;

    _ref = globals.events;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      str = $element.data(event);
      if (!str) {
        continue;
      }
      _results.push(new EventBinding(event, $element, this.scope, this.parent, this.root));
    }
    return _results;
  };

  Parser.prototype.parseString = function(str) {
    var part, parts, scope, value, _i, _len;

    parts = str.split('.');
    switch (parts[0]) {
      case '$root':
        scope = this.root;
        parts.shift();
        break;
      case '$parent':
        scope = this.parent;
        parts.shift();
        break;
      case '$data':
        scope = this.scope;
        parts.shift();
        break;
      default:
        scope = this.scope;
    }
    value = scope;
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      value = value[part];
    }
    return value;
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
    if (this.controller.view) {
      this.$element.data('compose', 'controller');
    }
    this.afterRender();
  }

  Core.prototype.afterRender = function() {
    return new Parser(this.$element, this.controller, false, this.controller);
  };

  Core.prototype.checkForChanges = function() {
    var _this = this;

    return setTimeout(function() {
      var binding, _i, _len, _ref;

      _ref = globals.bindings;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        binding.update();
      }
      return _this.cleanBindings();
    });
  };

  Core.prototype.cleanBindings = function() {
    var binding, count, element, index, _i, _ref, _ref1, _ref2, _results;

    count = globals.bindings.length;
    _results = [];
    for (index = _i = _ref = count - 1; _ref <= 0 ? _i <= 0 : _i >= 0; index = _ref <= 0 ? ++_i : --_i) {
      binding = globals.bindings[index];
      element = ((_ref1 = binding.$placeholder) != null ? _ref1.get(0) : void 0) || ((_ref2 = binding.$element) != null ? _ref2.get(0) : void 0);
      if (!$.contains(document.body, element)) {
        _results.push(globals.bindings.splice(index, 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Core;

})();
})(jQuery);