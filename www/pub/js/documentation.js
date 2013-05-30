(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DataBindingController, SectionController;

    SectionController = require('./section-controller');
    return DataBindingController = (function(_super) {
      __extends(DataBindingController, _super);

      DataBindingController.prototype.view = 'documentation';

      DataBindingController.prototype.category = 'Documentation';

      DataBindingController.prototype.searchEnabled = true;

      DataBindingController.prototype.searchTerm = '';

      DataBindingController.prototype.listStyle = 'tile';

      function DataBindingController() {
        this.highlight = __bind(this.highlight, this);
        this.test = __bind(this.test, this);
        this.handleListButton = __bind(this.handleListButton, this);
      }

      DataBindingController.prototype.handleListButton = function($element, style) {
        if (style === this.listStyle) {
          return $element.attr('disabled', true).addClass('selected');
        } else {
          return $element.attr('disabled', false).removeClass('selected');
        }
      };

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

      DataBindingController.prototype.test = function(binding) {
        var arg, term, _i, _len, _ref;

        term = this.searchTerm.toLowerCase();
        if (!this.searchTerm) {
          return true;
        }
        if (binding.title.toLowerCase().match(term)) {
          return true;
        }
        if (binding.syntax.toLowerCase().match(term)) {
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
        var newText, regex, regexString;

        if (!this.searchTerm) {
          return text.replace('#{', '#\\{');
        }
        regexString = this.searchTerm.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        regex = new RegExp(regexString, 'gi');
        newText = text.replace(regex, function(match) {
          return "<span class=\"highlight\">" + match + "</span>";
        });
        return newText.replace('#{', '#\\{');
      };

      return DataBindingController;

    })(SectionController);
  });

}).call(this);
