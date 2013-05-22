var Core,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Core = (function() {
  function Core($element, controller) {
    this.$element = $element;
    this.controller = controller;
    this.afterRender = __bind(this.afterRender, this);
    this.afterRender();
  }

  Core.prototype.afterRender = function() {
    return new Parser(this.$element, this.controller, false, this.controller);
  };

  Core.prototype.checkForChanges = function() {
    var _this = this;

    return setTimeout(function() {
      var binding, _i, _len, _ref;

      _ref = Recoil.bindings;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        binding.update();
      }
      return _this.cleanBindings();
    });
  };

  Core.prototype.cleanBindings = function() {
    var binding, count, element, index, _i, _ref, _ref1, _ref2, _results;

    count = Recoil.bindings.length;
    _results = [];
    for (index = _i = _ref = count - 1; _ref <= 0 ? _i <= 0 : _i >= 0; index = _ref <= 0 ? ++_i : --_i) {
      binding = Recoil.bindings[index];
      element = ((_ref1 = binding.$placeholder) != null ? _ref1.get(0) : void 0) || ((_ref2 = binding.$element) != null ? _ref2.get(0) : void 0);
      if (!$.contains(document.body, element)) {
        _results.push(Recoil.bindings.splice(index, 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Core;

})();
