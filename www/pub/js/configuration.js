(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ConfigurationController, ReferenceController, _ref;

    ReferenceController = require('./reference');
    return ConfigurationController = (function(_super) {
      __extends(ConfigurationController, _super);

      function ConfigurationController() {
        _ref = ConfigurationController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ConfigurationController.prototype.title = 'Configuration';

      ConfigurationController.prototype.data = require('./data/configuration');

      return ConfigurationController;

    })(ReferenceController);
  });

}).call(this);
