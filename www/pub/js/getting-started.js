(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ContentController, GettingStartedController, _ref;

    ContentController = require('./content');
    return GettingStartedController = (function(_super) {
      __extends(GettingStartedController, _super);

      function GettingStartedController() {
        _ref = GettingStartedController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GettingStartedController.prototype.category = 'Documentation';

      GettingStartedController.prototype.title = 'Getting Started';

      GettingStartedController.prototype.data = require('./data/getting-started');

      GettingStartedController.prototype.parse = function(code) {
        var index, line, lines, _i, _len;

        lines = code.split(/\n/);
        for (index = _i = 0, _len = lines.length; _i < _len; index = ++_i) {
          line = lines[index];
          lines[index] = line.replace(/^\s+/, function(match) {
            return Array(match.length + 1).join('&nbsp;');
          }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return lines.join('<br />');
      };

      GettingStartedController.prototype.highlight = function($element) {
        return setTimeout(function() {
          return hljs.highlightBlock($element.get(0), null, true);
        });
      };

      return GettingStartedController;

    })(ContentController);
  });

}).call(this);
