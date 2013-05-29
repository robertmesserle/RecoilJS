(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
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

      DataBindingController.prototype.searchEnabled = true;

      DataBindingController.prototype.searchTerm = '';

      DataBindingController.prototype.bindings = Data;

      function DataBindingController() {
        this.highlight = __bind(this.highlight, this);
        this.test = __bind(this.test, this);
        this.search = __bind(this.search, this);
      }

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

      DataBindingController.prototype.search = function() {
        var binding, _i, _len, _ref, _results;

        if (!this.searchTerm) {
          return this.bindings;
        }
        _ref = this.bindings;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          binding = _ref[_i];
          if (this.test(binding)) {
            _results.push(binding);
          }
        }
        return _results;
      };

      DataBindingController.prototype.test = function(binding) {
        var arg, term, _i, _len, _ref;

        term = this.searchTerm.toLowerCase();
        if (!this.searchTerm) {
          return true;
        }
        if (binding.title.toLowerCase().match(term)) {
          return true;
        }
        _ref = binding.args || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          arg = _ref[_i];
          if (arg.name.toLowerCase().match(term)) {
            return true;
          }
        }
      };

      DataBindingController.prototype.highlight = function(text) {
        var regex, regexString;

        if (!this.searchTerm) {
          return text;
        }
        regexString = this.searchTerm.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        regex = new RegExp(regexString, 'gi');
        return text.replace(regex, function(match) {
          return "<span class=\"highlight\">" + match + "</span>";
        });
      };

      return DataBindingController;

    })(SectionController);
  });

}).call(this);
