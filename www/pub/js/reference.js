(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DataentryController, SectionController, _ref;

    SectionController = require('./section');
    return DataentryController = (function(_super) {
      __extends(DataentryController, _super);

      function DataentryController() {
        this.highlight = __bind(this.highlight, this);
        this.test = __bind(this.test, this);
        this.formatSyntax = __bind(this.formatSyntax, this);
        this.highlightTerms = __bind(this.highlightTerms, this);
        this.handleListButton = __bind(this.handleListButton, this);        _ref = DataentryController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DataentryController.prototype.view = 'reference';

      DataentryController.prototype.category = 'Reference';

      DataentryController.prototype.searchEnabled = true;

      DataentryController.prototype.searchTerm = '';

      DataentryController.prototype.listStyle = 'list';

      DataentryController.prototype.handleListButton = function($element, style) {
        if (style === this.listStyle) {
          return $element.attr('disabled', true).addClass('selected');
        } else {
          return $element.attr('disabled', false).removeClass('selected');
        }
      };

      DataentryController.prototype.highlightTerms = function(line, terms, highlight, escape) {
        var arg, _i, _len;

        if (terms == null) {
          terms = [];
        }
        if (escape == null) {
          escape = true;
        }
        for (_i = 0, _len = terms.length; _i < _len; _i++) {
          arg = terms[_i];
          if (highlight) {
            line = line.replace(":" + arg.name, "<span class=\"important\">" + arg.name + "</span>");
          } else {
            line = line.replace(":" + arg.name, arg.name);
          }
        }
        if (escape) {
          line = line.replace('#{', '#\\{');
        }
        return line;
      };

      DataentryController.prototype.formatSyntax = function(entry, highlight) {
        var html, indent, lastIndent, line, _i, _len, _ref1, _ref2, _ref3;

        if (highlight == null) {
          highlight = true;
        }
        html = '';
        indent = lastIndent = 0;
        _ref1 = entry.syntax.split(/\n/g);
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          line = _ref1[_i];
          indent = ((_ref2 = line.match(/^\s+/)) != null ? (_ref3 = _ref2[0]) != null ? _ref3.length : void 0 : void 0) || 0;
          if (indent > lastIndent) {
            html += '<div class="block">';
          } else if (indent < lastIndent) {
            html += '</div>';
          }
          lastIndent = indent;
          html += '<div>';
          html += this.highlightTerms(line, entry.args, highlight);
          html += '</div>';
        }
        return html;
      };

      DataentryController.prototype.test = function(entry) {
        var arg, term, _i, _len, _ref1;

        term = this.searchTerm.toLowerCase();
        if (!this.searchTerm) {
          return true;
        }
        if (entry.title.toLowerCase().match(term)) {
          return true;
        }
        if (this.highlightTerms(entry.syntax, entry.args, false).toLowerCase().match(term)) {
          return true;
        }
        _ref1 = entry.args || [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          arg = _ref1[_i];
          if (arg.name.toLowerCase().match(term)) {
            return true;
          }
        }
      };

      DataentryController.prototype.highlight = function(text) {
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

      return DataentryController;

    })(SectionController);
  });

}).call(this);
