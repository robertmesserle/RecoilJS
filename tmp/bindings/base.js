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
    return Recoil.bindings.push(this);
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
    var argHash, args, js, key, scopeArgs, value;

    js = CoffeeScript.compile("do -> " + str, {
      bare: true
    });
    argHash = {};
    args = [];
    scopeArgs = [];
    for (key in this.scope) {
      if (isNaN(key)) {
        argHash[key] = "this.scope[ '" + key + "' ]";
      }
    }
    for (key in this.extras) {
      if (isNaN(key)) {
        argHash[key] = "this.extras[ '" + key + "' ]";
      }
    }
    for (key in argHash) {
      value = argHash[key];
      args.push(key);
      scopeArgs.push(value);
    }
    args.push('$root, $parent, $scope, $extras');
    scopeArgs.push('this.root, this.parent, this.scope, this.extras');
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
    if (typeof scope[part] === 'function') {
      return scope[part](value);
    } else {
      return scope[part] = value;
    }
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
