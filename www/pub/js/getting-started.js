(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var GettingStartedController, SectionController;

    SectionController = require('./section-controller');
    return GettingStartedController = (function(_super) {
      __extends(GettingStartedController, _super);

      GettingStartedController.prototype.view = 'getting-started';

      GettingStartedController.prototype.category = 'Tutorials';

      GettingStartedController.prototype.title = 'Getting Started';

      function GettingStartedController() {}

      return GettingStartedController;

    })(SectionController);
  });

}).call(this);
