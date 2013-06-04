(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Data, DocumentationController, RouterController, _ref;

    DocumentationController = require('./reference');
    Data = require('./data/router');
    return RouterController = (function(_super) {
      __extends(RouterController, _super);

      function RouterController() {
        _ref = RouterController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RouterController.prototype.title = 'Router';

      RouterController.prototype.bindings = Data;

      return RouterController;

    })(DocumentationController);
  });

}).call(this);
