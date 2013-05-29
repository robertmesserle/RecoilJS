(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ConfigurationController, SectionController;

    SectionController = require('./section-controller');
    return ConfigurationController = (function(_super) {
      __extends(ConfigurationController, _super);

      ConfigurationController.prototype.view = 'configuration';

      ConfigurationController.prototype.category = 'Documentation';

      ConfigurationController.prototype.title = 'Configuration';

      function ConfigurationController() {}

      return ConfigurationController;

    })(SectionController);
  });

}).call(this);
