(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DataBindingController, SectionController;

    SectionController = require('./section');
    return DataBindingController = (function(_super) {
      __extends(DataBindingController, _super);

      DataBindingController.prototype.view = 'reference';

      DataBindingController.prototype.category = 'Reference';

      DataBindingController.prototype.searchEnabled = true;

      DataBindingController.prototype.searchTerm = '';

      DataBindingController.prototype.listStyle = 'list';

      function DataBindingController() {
        this.highlight = __bind(this.highlight, this);
        this.test = __bind(this.test, this);
        this.formatSyntax = __bind(this.formatSyntax, this);
        this.highlightTerms = __bind(this.highlightTerms, this);
        this.handleListButton = __bind(this.handleListButton, this);
      }

      DataBindingController.prototype.handleListButton = function($element, style) {
        if (style === this.listStyle) {
          return $element.attr('disabled', true).addClass('selected');
        } else {
          return $element.attr('disabled', false).removeClass('selected');
        }
      };

      DataBindingController.prototype.highlightTerms = function(line, terms) {
        var arg, _i, _len;

        if (terms == null) {
          terms = [];
        }
        for (_i = 0, _len = terms.length; _i < _len; _i++) {
          arg = terms[_i];
          line = line.replace(":" + arg.name, "<span class=\"important\">" + arg.name + "</span>");
        }
        line = line.replace('#{', '#\\{');
        return line;
      };

      DataBindingController.prototype.formatSyntax = function(binding, highlight) {
        var html, indent, lastIndent, line, _i, _len, _ref, _ref1, _ref2;

        if (highlight == null) {
          highlight = true;
        }
        html = '';
        indent = lastIndent = 0;
        _ref = binding.syntax.split(/\n/g);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          line = _ref[_i];
          indent = ((_ref1 = line.match(/^\s+/)) != null ? (_ref2 = _ref1[0]) != null ? _ref2.length : void 0 : void 0) || 0;
          if (indent > lastIndent) {
            html += '<div class="block">';
          } else if (indent < lastIndent) {
            html += '</div>';
          }
          lastIndent = indent;
          html += '<div>';
          html += highlight ? this.highlightTerms(line, binding.args) : $.trim(line);
          html += '</div>';
        }
        return html;
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
