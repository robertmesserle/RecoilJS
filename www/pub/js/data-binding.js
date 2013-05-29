(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Data, DataBindingController, SectionController;

    SectionController = require('./section-controller');
    Data = require('./data/data-binding');
    return DataBindingController = (function(_super) {
      __extends(DataBindingController, _super);

      DataBindingController.prototype.view = 'data-binding';

      DataBindingController.prototype.category = 'Documentation';

      DataBindingController.prototype.title = 'Data Binding';

      DataBindingController.prototype.bindings = Data;

      function DataBindingController() {}

      DataBindingController.prototype.formatSyntax = function(binding) {
        var arg, syntax, _i, _len, _ref;

        syntax = binding.syntax;
        _ref = binding.args || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          arg = _ref[_i];
          syntax = syntax.replace(arg.name, "<span class=\"blue\">" + arg.name + "</span>");
        }
        syntax = syntax.replace('#{', '#\\{');
        return syntax;
      };

      return DataBindingController;

    })(SectionController);
  });

}).call(this);
