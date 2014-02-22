(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AttributeText, Base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

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

module.exports = AttributeText;


},{"./base.coffee":3}],2:[function(require,module,exports){
var AttrBinding, Base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

AttrBinding = (function(_super) {
  __extends(AttrBinding, _super);

  function AttrBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('attr'))) {
      return;
    }
    this.setValue();
    AttrBinding.__super__.constructor.apply(this, arguments);
  }

  AttrBinding.prototype.setValue = function() {
    var key, value;
    value = $.extend(true, {}, this.parseBinding(this.binding));
    if (this.value === value) {
      return;
    }
    if (this.value) {
      for (key in this.value) {
        this.value[key] = '';
      }
    }
    this.context.$element.attr($.extend(true, this.value || {}, value));
    return this.value = value;
  };

  AttrBinding.prototype.update = function() {
    return this.setValue();
  };

  return AttrBinding;

})(Base);

module.exports = AttrBinding;


},{"./base.coffee":3}],3:[function(require,module,exports){
var Base, Compiler, shared;

shared = require('../shared.coffee');

Compiler = require('../compiler.coffee');

Base = (function() {
  function Base() {
    this.logic = this.context.$element.data('logic') != null;
    if (this.logic || this["if"]) {
      this.insertPlaceholder();
    }
    this.pushBinding();
  }

  Base.prototype.getBindings = function() {
    var bindings, _ref, _ref1;
    bindings = (_ref = this.context.extras) != null ? (_ref1 = _ref.parentBinding) != null ? _ref1.bindings : void 0 : void 0;
    if (bindings == null) {
      bindings = shared.bindings;
    }
    return bindings;
  };

  Base.prototype.pushBinding = function() {
    var bindings;
    if (this.context.$element.data('static') != null) {
      return;
    }
    bindings = this.getBindings();
    if (this.update) {
      bindings.read.push(this);
    }
    if (this.write) {
      return bindings.write.push(this);
    }
  };

  Base.prototype.parseBinding = function(binding, evalFunction) {
    var jsBinding;
    if (evalFunction == null) {
      evalFunction = true;
    }
    if (this.cachedBindings == null) {
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

  Base.prototype.cleanParentBindings = function() {
    var bindings, element, index, _i, _ref, _ref1, _ref2, _results;
    bindings = this.getBindings();
    _results = [];
    for (index = _i = _ref = bindings.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; index = _ref <= 0 ? ++_i : --_i) {
      element = ((_ref1 = binding.context.$placeholder) != null ? _ref1.get(0) : void 0) || ((_ref2 = binding.context.$element) != null ? _ref2.get(0) : void 0);
      if (!$.contains(document.body, element)) {
        _results.push(bindings.splice(index, 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Base.prototype.removeBinding = function() {
    var bindings, index, _ref, _ref1;
    bindings = (_ref = this.context.extras) != null ? (_ref1 = _ref.parentBinding) != null ? _ref1.bindings : void 0 : void 0;
    if (bindings == null) {
      bindings = shared.bindings;
    }
    index = bindings.read.indexOf(this);
    if (!(index + 1)) {
      return;
    }
    return bindings.read.splice(index, 1);
  };

  Base.prototype.parseString = function(str) {
    var jsString;
    if (this.cachedStrings == null) {
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
    js = Compiler.compile("" + str);
    argHash = {
      $element: 'this.context.$element',
      $root: 'this.context.root',
      $parent: 'this.context.parent',
      $data: 'this.context.scope',
      $scope: 'this.context.scope',
      $extras: 'this.context.extras'
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
    this.context.$placeholder = $("<!-- RecoilJS: " + str + " -->").insertBefore(this.context.$element);
    return this.unwrap();
  };

  Base.prototype.wrap = function() {
    if (!this.context.unwrapped) {
      return;
    }
    if (!this.logic) {
      return;
    }
    this.context.unwrapped = false;
    this.context.$element.insertBefore(this.context.$contents);
    return this.context.$contents.appendTo(this.context.$element);
  };

  Base.prototype.unwrap = function() {
    if (this.context.unwrapped) {
      return;
    }
    if (!this.logic) {
      return;
    }
    this.context.unwrapped = true;
    this.context.$contents = this.context.$element.contents().insertAfter(this.context.$element);
    return this.context.$element.detach();
  };

  Base.prototype.checkBindings = function() {
    var binding, bindings, set, _i, _len, _ref, _results;
    if (!this.bindings) {
      return;
    }
    _ref = [
      {
        type: 'write',
        method: 'write'
      }, {
        type: 'read',
        method: 'update'
      }
    ];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      set = _ref[_i];
      bindings = this.bindings[set.type];
      _results.push((function() {
        var _j, _len1, _ref1, _results1;
        _ref1 = bindings.slice(0);
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          binding = _ref1[_j];
          _results1.push(binding[set.method]());
        }
        return _results1;
      })());
    }
    return _results;
  };

  return Base;

})();

module.exports = Base;


},{"../compiler.coffee":16,"../shared.coffee":28}],4:[function(require,module,exports){
var Base, ComposeBinding, shared, transitions, viewPath, views,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

shared = require('../shared.coffee');

views = shared.views, viewPath = shared.viewPath, transitions = shared.transitions;

Base = require('./base.coffee');

ComposeBinding = (function(_super) {
  __extends(ComposeBinding, _super);

  function ComposeBinding(context) {
    this.context = context;
    this.renderView = __bind(this.renderView, this);
    if (!((this.binding = this.context.$element.data('compose')) || this.context.$element.data('view'))) {
      return;
    }
    this.context.skipChildren = true;
    this.bindings = {
      read: [],
      write: []
    };
    if (this.binding) {
      this.controller = this.parseBinding(this.binding);
    }
    this.view = this.getView();
    if (this.view) {
      this.loadView();
    }
    ComposeBinding.__super__.constructor.apply(this, arguments);
  }

  ComposeBinding.prototype.getView = function(controller) {
    var view;
    if (controller == null) {
      controller = this.controller;
    }
    view = this.context.$element.data('view');
    if (view) {
      return this.parseBinding(view);
    }
    return controller != null ? controller.view : void 0;
  };

  ComposeBinding.prototype.loadView = function() {
    var url;
    url = "" + viewPath + "/" + this.view + ".html";
    if (views[url]) {
      return this.renderView(views[url]);
    }
    this.loading = true;
    return $.ajax({
      url: url,
      success: (function(_this) {
        return function(data) {
          _this.loading = false;
          data = views[url] = data.replace(/<\$/g, '<div data-logic="true"').replace(/<\/\$>/g, '</div>');
          return _this.renderView(data);
        };
      })(this)
    });
  };

  ComposeBinding.prototype.renderView = function(data) {
    var intro, _ref, _ref1, _ref2;
    if (data == null) {
      data = this.html;
    }
    if ((_ref = this.controller) != null) {
      if (typeof _ref.beforeRender === "function") {
        _ref.beforeRender(this.context.$element, this.context.parent, this.context.root);
      }
    }
    this.context.$element.scrollTop(0);
    this.html = data;
    this.bindings = {
      read: [],
      write: []
    };
    this.insertHtml();
    if ((_ref1 = this.controller) != null) {
      if (typeof _ref1.afterRender === "function") {
        _ref1.afterRender(this.context.$element, this.context.parent, this.context.root);
      }
    }
    intro = transitions.intro[this.view] || ((_ref2 = this.controller) != null ? _ref2.intro : void 0) || null;
    return typeof intro === "function" ? intro(this.context.$element) : void 0;
  };

  ComposeBinding.prototype.insertHtml = function() {
    var comment;
    comment = $('<!-- placeholder comment for compose binding -->').insertBefore(this.context.$element);
    this.context.$element.detach().html(this.html);
    this.parseChildren();
    return comment.after(this.context.$element).remove();
  };

  ComposeBinding.prototype.parseChildren = function() {
    return this.context.$element.contents().each((function(_this) {
      return function(index, element) {
        var extras;
        extras = $.extend({}, _this.context.extras, {
          parentBinding: _this
        });
        return new shared.Parser({
          $element: $(element),
          scope: _this.controller,
          parent: _this.context.scope,
          root: _this.context.root,
          extras: extras
        });
      };
    })(this));
  };

  ComposeBinding.prototype.update = function() {
    var callback, controller, outro, view, _ref;
    if (this.loading) {
      return;
    }
    if (this.binding) {
      controller = this.parseBinding(this.binding);
    }
    view = this.getView(controller);
    if (this.controller !== controller || this.view !== view) {
      outro = transitions.outro[this.view] || ((_ref = this.controller) != null ? _ref.outro : void 0) || null;
      this.controller = controller;
      this.view = view;
      callback = (function(_this) {
        return function() {
          if (_this.view) {
            return _this.loadView();
          }
        };
      })(this);
      return (typeof outro === "function" ? outro(this.context.$element, callback) : void 0) || callback();
    } else {
      return this.checkBindings();
    }
  };

  return ComposeBinding;

})(Base);

module.exports = ComposeBinding;


},{"../shared.coffee":28,"./base.coffee":3}],5:[function(require,module,exports){
var Base, ContextBinding, shared,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

shared = require('../shared.coffee');

Base = require('./base.coffee');

ContextBinding = (function(_super) {
  __extends(ContextBinding, _super);

  function ContextBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('context'))) {
      return;
    }
    this.$template = this.context.$element.contents().clone();
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
    var value;
    value = this.parseBinding(this.binding);
    if (this.value === value) {
      return;
    }
    this.context.$element.html(this.$template.clone());
    this.removeBinding();
    return new shared.Parser(this.context);
  };

  return ContextBinding;

})(Base);

module.exports = ContextBinding;


},{"../shared.coffee":28,"./base.coffee":3}],6:[function(require,module,exports){
var Base, CSSBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

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

module.exports = CSSBinding;


},{"./base.coffee":3}],7:[function(require,module,exports){
var Base, EventBinding, events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

events = require('../shared.coffee').events;

Base = require('./base.coffee');

EventBinding = (function(_super) {
  __extends(EventBinding, _super);

  function EventBinding(context, eventName) {
    var csString, func, str;
    this.context = context;
    if (!eventName) {
      return this.parseEvents();
    }
    str = this.context.$element.data(eventName);
    csString = "" + str;
    func = this.parseBinding(csString, false);
    eventName = "" + eventName + ".recoil";
    this.context.$element.off(eventName).on(eventName, (function(_this) {
      return function(event) {
        var ret, _ref;
        ret = func.call(_this, event);
        if (typeof ret === 'function') {
          return ret(event, ((_ref = _this.context.extras) != null ? _ref.item : void 0) || _this.context.scope);
        } else {
          return ret;
        }
      };
    })(this));
  }

  EventBinding.prototype.parseEvents = function() {
    var event, str, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      event = events[_i];
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

module.exports = EventBinding;


},{"../shared.coffee":28,"./base.coffee":3}],8:[function(require,module,exports){
var Base, ForBinding, shared,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

shared = require('../shared.coffee');

Base = require('./base.coffee');

ForBinding = (function(_super) {
  __extends(ForBinding, _super);

  function ForBinding(context) {
    this.context = context;
    this.updateItems = __bind(this.updateItems, this);
    this.checkForChanges = __bind(this.checkForChanges, this);
    if (!(this.binding = this.context.$element.data('for'))) {
      return;
    }
    this.bindings = {
      read: [],
      write: []
    };
    this.context.skipChildren = true;
    this.getParts();
    this.getTemplate();
    this.collection = this.getCollection();
    this.wrap();
    this.parseItems(this.collection);
    this.unwrap();
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
    extras.parentBinding = this;
    return new shared.Parser({
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
    if (this.checkForChanges(collection)) {
      this.wrap();
      this.collection = collection.slice(0);
      this.bindings = {
        read: [],
        write: []
      };
      this.context.$element.empty();
      this.parseItems(collection);
      return this.unwrap();
    } else {
      return this.checkBindings();
    }
  };

  ForBinding.prototype.update = function() {
    return this.updateItems();
  };

  return ForBinding;

})(Base);

module.exports = ForBinding;


},{"../shared.coffee":28,"./base.coffee":3}],9:[function(require,module,exports){
var Base, HTMLBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

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

module.exports = HTMLBinding;


},{"./base.coffee":3}],10:[function(require,module,exports){
var Base, IfBinding, shared,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

shared = require('../shared.coffee');

Base = require('./base.coffee');

IfBinding = (function(_super) {
  __extends(IfBinding, _super);

  IfBinding.prototype["if"] = true;

  function IfBinding(context) {
    this.context = context;
    this.reparse = __bind(this.reparse, this);
    if ((this.binding = this.context.$element.data('if')) == null) {
      return;
    }
    this.checkForErrors();
    IfBinding.__super__.constructor.apply(this, arguments);
    this.update(false);
  }

  IfBinding.prototype.checkForErrors = function() {
    if (this.context.$element.data('for')) {
      throw 'Recoil Error:  "data-for" and "data-if" cannot be used on the same element.';
    }
  };

  IfBinding.prototype.reparse = function() {
    this.wrap();
    this.removeBinding();
    new shared.Parser(this.context);
    return delete this.reparse;
  };

  IfBinding.prototype.setValue = function(reparse) {
    if (reparse == null) {
      reparse = false;
    }
    this.context.stopParsing = !this.value;
    if (this.value) {
      this.context.$element.insertAfter(this.context.$placeholder);
      if (reparse) {
        return this.reparse();
      }
    } else {
      this.context.$element.detach();
      return this.cleanParentBindings();
    }
  };

  IfBinding.prototype.update = function(reparse) {
    var value;
    if (reparse == null) {
      reparse = true;
    }
    value = !!this.parseBinding(this.binding);
    if (this.value !== value) {
      this.value = value;
      this.wrap();
      this.setValue(reparse);
      return this.unwrap();
    }
  };

  return IfBinding;

})(Base);

module.exports = IfBinding;


},{"../shared.coffee":28,"./base.coffee":3}],11:[function(require,module,exports){
var Base, InitBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

InitBinding = (function(_super) {
  __extends(InitBinding, _super);

  function InitBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('init'))) {
      return;
    }
    this.csString = "-> " + this.binding;
    this.func = this.parseBinding(this.csString, false);
    this.func.call(this)();
    InitBinding.__super__.constructor.apply(this, arguments);
  }

  return InitBinding;

})(Base);

module.exports = InitBinding;


},{"./base.coffee":3}],12:[function(require,module,exports){
var Base, TextNode,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

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

module.exports = TextNode;


},{"./base.coffee":3}],13:[function(require,module,exports){
var Base, UpdateBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

UpdateBinding = (function(_super) {
  __extends(UpdateBinding, _super);

  function UpdateBinding(context) {
    this.context = context;
    if (!(this.binding = this.context.$element.data('update'))) {
      return;
    }
    this.csString = "-> " + this.binding;
    this.func = this.parseBinding(this.csString, false);
    this.func.call(this)();
    UpdateBinding.__super__.constructor.apply(this, arguments);
  }

  UpdateBinding.prototype.update = function() {
    try {
      return this.func.call(this)();
    } catch (_error) {}
  };

  return UpdateBinding;

})(Base);

module.exports = UpdateBinding;


},{"./base.coffee":3}],14:[function(require,module,exports){
var Base, ValueBinding,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

ValueBinding = (function(_super) {
  __extends(ValueBinding, _super);

  function ValueBinding(context) {
    this.context = context;
    this.updateHandler = __bind(this.updateHandler, this);
    if (!(this.binding = this.context.$element.data('value'))) {
      return;
    }
    this.context.skipChildren = true;
    this.setValue();
    if (this.context.$element.is('select')) {
      this.updateHandler();
    }
    this.bindEvents();
    ValueBinding.__super__.constructor.apply(this, arguments);
  }

  ValueBinding.prototype.bindEvents = function() {
    var events;
    events = 'click keydown change';
    return this.context.$element.on(events, $.noop);
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
    return this.updateHandler();
  };

  return ValueBinding;

})(Base);

module.exports = ValueBinding;


},{"./base.coffee":3}],15:[function(require,module,exports){
var Base, VisibleBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('./base.coffee');

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

module.exports = VisibleBinding;


},{"./base.coffee":3}],16:[function(require,module,exports){
var Compiler;

Compiler = (function() {
  function Compiler() {}

  Compiler.compile = function(str) {
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

  return Compiler;

})();

module.exports = Compiler;


},{}],17:[function(require,module,exports){
var Core, Parser,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Parser = require('./parser.coffee');

Core = (function() {
  function Core($element, controller) {
    this.$element = $element;
    this.controller = controller;
    this.addComposition = __bind(this.addComposition, this);
    this.checkForLogicTags();
    this.addComposition();
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

  Core.prototype.addComposition = function() {
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

module.exports = Core;


},{"./parser.coffee":26}],18:[function(require,module,exports){
var DirtyCheck, root, shared;

shared = require('./shared.coffee');

root = window;

DirtyCheck = (function() {
  DirtyCheck.originalMethods = {};

  DirtyCheck.instance = null;

  DirtyCheck.lastCheck = 0;

  DirtyCheck.timeout = null;

  DirtyCheck.update = function() {
    var callback, now, waitTime;
    if (this.timeout) {
      return;
    }
    now = +new Date();
    waitTime = now - this.lastCheck;
    this.lastCheck = now;
    if (waitTime > shared.throttle) {
      waitTime = 0;
    }
    callback = (function(_this) {
      return function() {
        var binding, set, _i, _len, _ref, _results;
        _this.timeout = null;
        _ref = [
          {
            type: 'write',
            method: 'write'
          }, {
            type: 'read',
            method: 'update'
          }
        ];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          set = _ref[_i];
          _results.push((function() {
            var _j, _len1, _ref1, _results1;
            _ref1 = shared.bindings[set.type];
            _results1 = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              binding = _ref1[_j];
              _results1.push(binding[set.method]());
            }
            return _results1;
          })());
        }
        return _results;
      };
    })(this);
    if (waitTime) {
      return this.timeout = this.originalMethods.setTimeout(callback, waitTime);
    } else {
      return callback();
    }
  };

  DirtyCheck.prototype.elementList = typeof InstallTrigger !== 'undefined' ? [HTMLAnchorElement, HTMLAppletElement, HTMLAreaElement, HTMLAudioElement, HTMLBaseElement, HTMLBodyElement, HTMLBRElement, HTMLButtonElement, HTMLCanvasElement, HTMLDataListElement, HTMLDirectoryElement, HTMLDivElement, HTMLDListElement, HTMLElement, HTMLEmbedElement, HTMLFieldSetElement, HTMLFontElement, HTMLFormElement, HTMLFrameElement, HTMLFrameSetElement, HTMLHeadElement, HTMLHeadingElement, HTMLHtmlElement, HTMLHRElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLabelElement, HTMLLegendElement, HTMLLIElement, HTMLLinkElement, HTMLMapElement, HTMLMediaElement, HTMLMenuElement, HTMLMetaElement, HTMLMeterElement, HTMLModElement, HTMLObjectElement, HTMLOListElement, HTMLOptGroupElement, HTMLOptionElement, HTMLOutputElement, HTMLParagraphElement, HTMLParamElement, HTMLPreElement, HTMLProgressElement, HTMLQuoteElement, HTMLScriptElement, HTMLSelectElement, HTMLSourceElement, HTMLSpanElement, HTMLStyleElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableRowElement, HTMLTableSectionElement, HTMLTextAreaElement, HTMLTitleElement, HTMLUListElement, HTMLUnknownElement, HTMLVideoElement] : [Element];

  function DirtyCheck() {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }
    this.constructor.instance = this;
    this.bindEvents();
    this.overwriteEventListeners();
    this.overwriteTimeouts();
  }

  DirtyCheck.prototype.getListener = function(originalMethod) {
    return function(type, listener) {
      var args;
      args = Array.apply(null, arguments);
      args[1] = function() {
        listener.apply(null, arguments);
        if (type.indexOf('down') >= 0) {
          return setTimeout(function() {
            return DirtyCheck.update();
          });
        } else {
          return DirtyCheck.update();
        }
      };
      return originalMethod.apply(this, args);
    };
  };

  DirtyCheck.prototype.overwriteEventListeners = function() {
    var originalMethod, type, _i, _len, _ref, _results;
    _ref = this.elementList;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      type = _ref[_i];
      originalMethod = type.prototype.addEventListener;
      if (originalMethod) {
        type.prototype.addEventListener = this.getListener(originalMethod);
      }
      originalMethod = type.prototype.attachEvent;
      if (originalMethod) {
        _results.push(type.prototype.attachEvent = this.getListener(originalMethod));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  DirtyCheck.prototype.overwriteTimeouts = function() {
    var func, originalMethod, _i, _len, _ref, _results;
    _ref = ['setTimeout', 'setInterval'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      func = _ref[_i];
      originalMethod = root[func];
      _results.push((function(_this) {
        return function(originalMethod) {
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
        };
      })(this)(originalMethod));
    }
    return _results;
  };

  DirtyCheck.prototype.bindEvents = function() {
    return $(function() {
      return $(document).ajaxComplete(function() {
        return DirtyCheck.update();
      }).on('load', 'script', function() {
        return DirtyCheck.update();
      }).on('click keydown', 'label', function() {
        return setTimeout(function() {
          return DirtyCheck.update();
        });
      });
    });
  };

  return DirtyCheck;

})();

module.exports = DirtyCheck;


},{"./shared.coffee":28}],19:[function(require,module,exports){
var Collection, Core, DirtyCheck, Model, Property, Recoil, Router, shared,
  __slice = [].slice;

shared = require('./shared.coffee');

DirtyCheck = require('./dirty-check.coffee');

Core = require('./core.coffee');

Router = require('./router.coffee');

Property = require('./model/property.coffee');

Collection = require('./model/collection.coffee');

Model = require('./model/model.coffee');

Recoil = (function() {
  Recoil.init = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Recoil, arguments, function(){});
  };

  Recoil.Property = Property;

  Recoil.Collection = Collection;

  Recoil.Model = Model;

  Recoil.mapRoute = function() {
    var _ref;
    return (_ref = Router.getInstance()).mapRoute.apply(_ref, arguments);
  };

  Recoil.mapDefaultRoute = function() {
    var _ref;
    return (_ref = Router.getInstance()).mapDefaultRoute.apply(_ref, arguments);
  };

  Recoil.triggerRouteChange = function() {
    return Router.getInstance().handleChange();
  };

  Recoil.createTransition = function(type, id, callback) {
    return Recoil.transitions[type][id] = callback;
  };

  Recoil.setViewPath = function(viewPath) {
    return shared.viewPath = viewPath;
  };

  Recoil.setMaxUpdateFrequency = function(throttle) {
    return shared.throttle = throttle;
  };

  function Recoil() {
    var args, controller, _i;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), controller = arguments[_i++];
    this.controller = controller;
    if (shared.app) {
      throw "You may only have one app running at a time.";
    }
    $((function(_this) {
      return function() {
        var $element;
        new DirtyCheck();
        $element = $("[data-app='" + args[0] + "'], [data-app], body").eq(0);
        return shared.app = new Core($element, _this.controller);
      };
    })(this));
  }

  return Recoil;

})();

if (typeof window !== "undefined" && window !== null) {
  window.Recoil = Recoil;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = Recoil;
}


},{"./core.coffee":17,"./dirty-check.coffee":18,"./model/collection.coffee":21,"./model/model.coffee":23,"./model/property.coffee":24,"./router.coffee":27,"./shared.coffee":28}],20:[function(require,module,exports){
var BaseModel, Virtual, shared;

shared = require('../shared.coffee');

Virtual = require('./virtual.coffee');

BaseModel = (function() {
  BaseModel.getByField = function(field, value) {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item[field] === value) {
        return item;
      }
    }
  };

  BaseModel.load = function(id, callback) {
    if (id != null) {
      return this.loadOne(id, callback);
    }
    return $.ajax({
      url: this.paths.root(),
      success: (function(_this) {
        return function(data) {
          var field, item, match, model, value, _i, _len;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            item = data[_i];
            match = _this.getByField('id', item.id);
            if (match != null) {
              for (field in data) {
                value = data[field];
                match[field] = value;
              }
              match.isNew = false;
            } else {
              model = new _this(item);
              model.isNew = false;
            }
          }
          return typeof callback === "function" ? callback(_this.items) : void 0;
        };
      })(this)
    });
  };

  BaseModel.loadOne = function(id, callback) {
    return $.ajax({
      url: this.paths.get.call({
        id: id
      }),
      success: (function(_this) {
        return function(data) {
          var item;
          item = new _this(data);
          return typeof callback === "function" ? callback(item) : void 0;
        };
      })(this)
    });
  };

  BaseModel.prototype.isNew = true;

  BaseModel.prototype.hasChanged = false;

  function BaseModel(data) {
    if (data == null) {
      data = {};
    }
    this._createBuckets();
    this._storeItem();
    this._wrapProps();
    this._createVirtuals();
    this.set(data, null, true, false);
    this.save();
    this._parseValidates();
    this._parseSubscribes();
    if (typeof this.initialize === "function") {
      this.initialize(data);
    }
  }

  BaseModel.prototype._createBuckets = function() {
    this.props = {};
    return this.virtuals = {};
  };

  BaseModel.prototype._storeItem = function() {
    return this.constructor.items.push(this);
  };

  BaseModel.prototype._wrapProps = function() {
    var key, prop, _ref, _results;
    _ref = this.$props || {};
    _results = [];
    for (key in _ref) {
      prop = _ref[key];
      this.props[key] = new shared.Property(prop, this.context);
      _results.push(this[key] = this.props[key].value);
    }
    return _results;
  };

  BaseModel.prototype._createVirtuals = function() {
    var key, prop, virtual, _ref, _results;
    _ref = this.$virtual || {};
    _results = [];
    for (key in _ref) {
      prop = _ref[key];
      this.virtuals[key] = virtual = new Virtual(prop, this);
      _results.push(this[key] = virtual.value);
    }
    return _results;
  };

  BaseModel.prototype._parseValidates = function() {
    var key, value, _ref, _results;
    _ref = this.$validate;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this.props[key]._validate = value);
    }
    return _results;
  };

  BaseModel.prototype._parseSubscribes = function() {
    var key, value, _ref, _results;
    _ref = this.$subscribe;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this.props[key]._subscribe = value);
    }
    return _results;
  };

  BaseModel.prototype.set = function(key, value, update, subscribe) {
    var obj;
    if (update == null) {
      update = true;
    }
    if (subscribe == null) {
      subscribe = true;
    }
    if (typeof key === 'object') {
      obj = key;
      for (key in obj) {
        value = obj[key];
        this.set(key, value, false, subscribe);
      }
      if (update) {
        return this.update();
      }
    } else if (this[key] !== value) {
      if (subscribe) {
        this.hasChanged = true;
      }
      if (this.props[key]) {
        this[key] = this.props[key].set(value, subscribe);
        if (update) {
          return this.updateVirtuals();
        }
      } else if (this.virtuals[key]) {
        this[key] = this.virtuals[key].set(value, subscribe);
        if (update) {
          return this.checkProps();
        }
      }
    }
  };

  BaseModel.prototype.unset = function(key) {
    return this[key] = this.props[key].unset();
  };

  BaseModel.prototype.revert = function() {
    var key, prop, _ref, _results;
    _ref = this.props;
    _results = [];
    for (key in _ref) {
      prop = _ref[key];
      this[key] = prop.revert();
      _results.push(this.updateVirtuals());
    }
    return _results;
  };

  BaseModel.prototype.validate = function() {
    var key, prop, _ref;
    _ref = this.props;
    for (key in _ref) {
      prop = _ref[key];
      if (!prop.validate()) {
        return false;
      }
    }
    return true;
  };

  BaseModel.prototype.escape = function(key) {
    return this[key].replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  BaseModel.prototype.save = function() {
    var key, prop, _ref;
    if (!this.validate()) {
      return false;
    }
    _ref = this.props;
    for (key in _ref) {
      prop = _ref[key];
      prop.save();
    }
    this.send();
    return true;
  };

  BaseModel.prototype.send = function() {
    var ajax, url;
    url = this.isNew ? this.constructor.paths.post.call(this) : this.constructor.paths.put.call(this);
    if (!url) {
      return;
    }
    ajax = {
      url: url,
      data: this.toJSON(),
      type: this.isNew ? 'POST' : 'PUT',
      success: (function(_this) {
        return function(data) {
          var key, value;
          _this.isNew = false;
          if (!data) {
            return false;
          }
          for (key in data) {
            value = data[key];
            if (_this.props[key] != null) {
              _this[key] = _this.props[key].set(value);
            }
          }
          return _this.updateVirtuals();
        };
      })(this)
    };
    $.ajax(ajax);
    return ajax;
  };

  BaseModel.prototype.fetch = function() {
    return $.ajax({
      url: this.constructor.paths.get.call(this),
      complete: function(data) {
        return this.set(data);
      }
    });
  };

  BaseModel.prototype.checkVirtuals = function() {
    var key, virtual, _ref, _results;
    _ref = this.virtuals;
    _results = [];
    for (key in _ref) {
      virtual = _ref[key];
      if (this[key] !== virtual.value) {
        _results.push(this[key] = virtual.set(this[key]));
      }
    }
    return _results;
  };

  BaseModel.prototype.checkProps = function() {
    var key, prop, _ref;
    _ref = this.props;
    for (key in _ref) {
      prop = _ref[key];
      if (!(this[key] !== prop.value)) {
        continue;
      }
      this[key] = prop.set(this[key]);
      this.hasChanged = true;
    }
    return this.updateVirtuals();
  };

  BaseModel.prototype.updateVirtuals = function() {
    var key, virtual, _ref, _results;
    _ref = this.virtuals;
    _results = [];
    for (key in _ref) {
      virtual = _ref[key];
      _results.push(this[key] = virtual.update());
    }
    return _results;
  };

  BaseModel.prototype.toJSON = function() {
    var json, key, prop, _ref, _ref1;
    json = {};
    _ref = this.props;
    for (key in _ref) {
      prop = _ref[key];
      json[key] = ((_ref1 = prop.value) != null ? typeof _ref1.toJSON === "function" ? _ref1.toJSON() : void 0 : void 0) || prop.value;
    }
    return json;
  };

  BaseModel.prototype.update = function() {
    this.checkVirtuals();
    return this.checkProps();
  };

  BaseModel.prototype.clone = function() {
    return new this.constructor(this.toJSON());
  };

  return BaseModel;

})();

module.exports = BaseModel;


},{"../shared.coffee":28,"./virtual.coffee":25}],21:[function(require,module,exports){
var Collection, DataType,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

DataType = require('./data-type.coffee');

Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    Collection.__super__.constructor.apply(this, arguments);
    this.value = [];
    this.savedValue = [];
    this.addArrayMethods();
  }

  Collection.prototype.addArrayMethods = function() {
    var method, _i, _len, _ref, _results;
    _ref = 'push pop unshift shift indexOf slice splice'.split(/\s/);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      _results.push((function(_this) {
        return function(method) {
          return _this[method] = function() {
            var _ref1;
            return (_ref1 = _this.value)[method].apply(_ref1, arguments);
          };
        };
      })(this)(method));
    }
    return _results;
  };

  Collection.prototype.save = function() {
    var _ref;
    if (!this.validate()) {
      return;
    }
    return (_ref = this.savedValue).splice.apply(_ref, [0, this.savedValue.length].concat(__slice.call(this.value)));
  };

  Collection.prototype.revert = function() {
    var _ref;
    return (_ref = this.value).splice.apply(_ref, [0, this.value.length].concat(__slice.call(this.savedValue.slice())));
  };

  Collection.prototype.find = function(criteria) {
    var index, item, _i, _len, _ref;
    index = this.value.indexOf(criteria);
    if (!(index < 0)) {
      return this.value[index];
    }
    if (typeof criteria !== 'function') {
      return;
    }
    _ref = this.value;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (criteria(item)) {
        return item;
      }
    }
  };

  return Collection;

})(DataType);

module.exports = Collection;


},{"./data-type.coffee":22}],22:[function(require,module,exports){
var BaseModel, DataType;

BaseModel = require('./base-model.coffee');

DataType = (function() {
  DataType.prototype.type = null;

  DataType.prototype["default"] = null;

  DataType.prototype.value = null;

  DataType.prototype.valid = true;

  function DataType(data, context) {
    if (data == null) {
      data = {};
    }
    this.context = context;
    this.parseData(data);
  }

  DataType.prototype.parseType = function(type) {
    var typeString, _ref;
    if (!type) {
      return (function(value) {
        return value;
      });
    }
    typeString = type.toString();
    if (typeString.indexOf('[native code]') + 1) {
      return type;
    }
    if ((type != null ? (_ref = type.__super__) != null ? _ref.constructor : void 0 : void 0) === BaseModel) {
      return (function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(type, arguments, function(){});
      });
    }
    type = type();
    return function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(type, arguments, function(){});
    };
  };

  DataType.prototype.parseData = function(data) {
    this.type = this.parseType(data.type);
    this._validate = data.validate || function() {
      return true;
    };
    return this._subscribe = data.subscribe || function() {
      return true;
    };
  };

  DataType.prototype.validate = function() {
    return this._validate.call(this.context, this.value);
  };

  return DataType;

})();

module.exports = DataType;


},{"./base-model.coffee":20}],23:[function(require,module,exports){
var BaseModel, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseModel = require('./base-model.coffee');

Model = (function() {
  Model.models = [];

  function Model(meta) {
    this.meta = meta != null ? meta : {};
    this.extendMeta();
    this.model = (function(_super) {
      __extends(model, _super);

      function model() {
        return model.__super__.constructor.apply(this, arguments);
      }

      return model;

    })(BaseModel);
    this.attachMeta();
    this.attachStatic();
    this.attachBuckets();
    this.initPaths();
    this.constructor.models.push(this.model);
    return this.model;
  }

  Model.prototype.extendMeta = function() {
    if (!this.meta.$extend) {
      return;
    }
    return this.meta = $.extend(true, {}, this.meta.$extend._meta, this.meta);
  };

  Model.prototype.attachStatic = function() {
    var key, prop, _ref, _results;
    _ref = this.meta.$static || {};
    _results = [];
    for (key in _ref) {
      prop = _ref[key];
      _results.push((function(_this) {
        return function(key, prop) {
          if (typeof prop === 'function') {
            return _this.model[key] = function() {
              return prop.apply(_this.model, arguments);
            };
          } else {
            return _this.model[key] = prop;
          }
        };
      })(this)(key, prop));
    }
    return _results;
  };

  Model.prototype.attachMeta = function() {
    var key, value, _ref, _results;
    this.model._meta = this.meta;
    _ref = this.meta;
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(this.model.prototype[key] = value);
    }
    return _results;
  };

  Model.prototype.attachBuckets = function() {
    return this.model.items = [];
  };

  Model.prototype.initPaths = function() {
    var $path, $paths, pathString, paths, rootPath;
    $path = this.meta.$path;
    $paths = this.meta.$paths;
    rootPath = $path || ($paths != null ? $paths.root : void 0);
    if (typeof rootPath !== 'function') {
      pathString = rootPath;
      rootPath = function() {
        return pathString;
      };
    }
    paths = {
      root: rootPath,
      get: function() {
        return "" + (paths.root.call(this.model)) + "/" + this.id;
      },
      put: function() {
        return paths.get.call(this);
      },
      post: function() {
        return paths.root.call(this.model);
      },
      "delete": function() {
        return paths.get.call(this);
      }
    };
    return this.model.paths = paths;
  };

  return Model;

})();

module.exports = Model;


},{"./base-model.coffee":20}],24:[function(require,module,exports){
var BaseModel, DataType, Model, Property, shared,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

shared = require('../shared.coffee');

DataType = require('./data-type.coffee');

BaseModel = require('./base-model.coffee');

Model = require('./model.coffee');

Property = (function(_super) {
  __extends(Property, _super);

  function Property() {
    return Property.__super__.constructor.apply(this, arguments);
  }

  Property.prototype["default"] = null;

  Property.prototype.parseType = function(type) {
    var typeString, _ref;
    if (!type) {
      return (function(value) {
        return value;
      });
    }
    typeString = type.toString();
    if (typeString.indexOf('[native code]') + 1) {
      return type;
    }
    if ((type != null ? (_ref = type.__super__) != null ? _ref.constructor : void 0 : void 0) === BaseModel) {
      return (function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(type, arguments, function(){});
      });
    }
    type = type();
    return function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(type, arguments, function(){});
    };
  };

  Property.prototype.parseData = function(data) {
    Property.__super__.parseData.apply(this, arguments);
    if (data["default"] != null) {
      this["default"] = this.type(data["default"]);
    }
    return this.value = this.savedValue = this["default"];
  };

  Property.prototype.set = function(value, subscribe) {
    if (subscribe == null) {
      subscribe = true;
    }
    if (subscribe) {
      this._subscribe.call(this.context, value, this.value);
    }
    return this.value = this.type instanceof Model ? new this.type(value) : this.type(value);
  };

  Property.prototype.unset = function() {
    return this.value = this["default"];
  };

  Property.prototype.save = function() {
    if (this.validate()) {
      return this.savedValue = this.value;
    }
  };

  Property.prototype.revert = function() {
    return this.value = this.savedValue;
  };

  return Property;

})(DataType);

shared.Property = Property;

module.exports = Property;


},{"../shared.coffee":28,"./base-model.coffee":20,"./data-type.coffee":22,"./model.coffee":23}],25:[function(require,module,exports){
var Virtual;

Virtual = (function() {
  function Virtual(meta, context) {
    this.meta = meta;
    this.context = context;
    this.update();
  }

  Virtual.prototype.set = function(value) {
    var _ref;
    if ((_ref = this.meta.write) != null) {
      _ref.call(this.context, value);
    }
    return this.update();
  };

  Virtual.prototype.get = function() {
    var _ref;
    return this.value = (_ref = this.meta.read) != null ? _ref.call(this.context) : void 0;
  };

  Virtual.prototype.update = function() {
    return this.get();
  };

  return Virtual;

})();

module.exports = Virtual;


},{}],26:[function(require,module,exports){
var AttrBinding, AttributeText, CSSBinding, ComposeBinding, ContextBinding, EventBinding, ForBinding, HTMLBinding, IfBinding, InitBinding, Parser, TextNode, UpdateBinding, ValueBinding, VisibleBinding, shared;

shared = require('./shared.coffee');

TextNode = require('./bindings/text-node.coffee');

IfBinding = require('./bindings/if.coffee');

AttributeText = require('./bindings/attribute-text.coffee');

EventBinding = require('./bindings/event.coffee');

AttrBinding = require('./bindings/attributes.coffee');

ContextBinding = require('./bindings/context.coffee');

CSSBinding = require('./bindings/css.coffee');

VisibleBinding = require('./bindings/visible.coffee');

ComposeBinding = require('./bindings/compose.coffee');

ForBinding = require('./bindings/for.coffee');

HTMLBinding = require('./bindings/html.coffee');

ValueBinding = require('./bindings/value.coffee');

UpdateBinding = require('./bindings/update.coffee');

InitBinding = require('./bindings/init.coffee');

Parser = (function() {
  Parser.prototype.bindings = [TextNode, IfBinding, AttributeText, EventBinding, AttrBinding, ContextBinding, CSSBinding, VisibleBinding, ComposeBinding, ForBinding, HTMLBinding, ValueBinding];

  function Parser(context) {
    this.context = context;
    this.context.$element.each((function(_this) {
      return function(index, element) {
        var $element;
        return _this.parseNode($element = $(element));
      };
    })(this));
  }

  Parser.prototype.parseNode = function($element) {
    var $contents, binding, context, _i, _len, _ref;
    context = {
      $element: $element,
      scope: this.context.scope,
      parent: this.context.parent,
      root: this.context.root,
      extras: this.context.extras
    };
    _ref = this.bindings;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      binding = _ref[_i];
      if (context.stopParsing) {
        return;
      }
      new binding(context);
    }
    if (context.skipChildren) {
      return;
    }
    $contents = context.$contents || $element.contents();
    $contents.each((function(_this) {
      return function(index, element) {
        return new Parser($.extend({}, context, context.childContext, {
          $element: $(element)
        }));
      };
    })(this));
    new UpdateBinding(context);
    return new InitBinding(context);
  };

  return Parser;

})();

shared.Parser = Parser;

module.exports = Parser;


},{"./bindings/attribute-text.coffee":1,"./bindings/attributes.coffee":2,"./bindings/compose.coffee":4,"./bindings/context.coffee":5,"./bindings/css.coffee":6,"./bindings/event.coffee":7,"./bindings/for.coffee":8,"./bindings/html.coffee":9,"./bindings/if.coffee":10,"./bindings/init.coffee":11,"./bindings/text-node.coffee":12,"./bindings/update.coffee":13,"./bindings/value.coffee":14,"./bindings/visible.coffee":15,"./shared.coffee":28}],27:[function(require,module,exports){
var DirtyCheck, Router,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DirtyCheck = require('./dirty-check.coffee');

Router = (function() {
  Router.getInstance = function() {
    return this.instance != null ? this.instance : this.instance = new Router;
  };

  Router.prototype.event = 'hashchange';

  Router.prototype.routes = [];

  Router.prototype.defaultRoute = null;

  function Router() {
    this.handleChange = __bind(this.handleChange, this);
    this.bindEvent();
  }

  Router.prototype.bindEvent = function() {
    return $(window).on('hashchange', this.handleChange);
  };

  Router.prototype.handleChange = function() {
    var hash, ret, route, _i, _len, _ref, _ref1;
    hash = location.hash.replace(/^#/, '');
    _ref = this.routes.sort(function(a, b) {
      return b.path.length - a.path.length;
    });
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      route = _ref[_i];
      if (route.regex.test(hash)) {
        ret = route.handler(this.getParams(hash, route));
        DirtyCheck.update();
        return ret;
      }
    }
    ret = (_ref1 = this.defaultRoute) != null ? _ref1.handler(hash) : void 0;
    DirtyCheck.update();
    return ret;
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
    var key, p, route, value, _i, _len, _results, _results1;
    if (path instanceof Array) {
      _results = [];
      for (_i = 0, _len = path.length; _i < _len; _i++) {
        p = path[_i];
        _results.push(this.mapRoute(p, handler));
      }
      return _results;
    } else if (typeof path === 'object') {
      _results1 = [];
      for (key in path) {
        value = path[key];
        _results1.push(this.mapRoute(key, value));
      }
      return _results1;
    } else {
      route = {
        regex: this.getRegex(path),
        path: path,
        handler: handler
      };
      return this.routes.push(route);
    }
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

module.exports = Router;


},{"./dirty-check.coffee":18}],28:[function(require,module,exports){
module.exports = {
  Parser: null,
  Property: null,
  app: null,
  viewPath: './views',
  throttle: 30,
  bindings: {
    read: [],
    write: []
  },
  views: {},
  transitions: {
    intro: {},
    outro: {}
  },
  events: 'blur focus focusin focusout load resize scroll unload click\ndblclick mousedown mouseup mousemove mouseover mouseout mouseenter\nmouseleave change select submit keydown keypress keyup error'.split(/\s+/g)
};


},{}]},{},[19])