(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var HomeController, SectionController;

    SectionController = require('./section-controller');
    return HomeController = (function(_super) {
      __extends(HomeController, _super);

      HomeController.prototype.view = 'home';

      HomeController.prototype.category = 'About';

      HomeController.prototype.title = 'Home';

      function HomeController() {}

      return HomeController;

    })(SectionController);
  });

}).call(this);
