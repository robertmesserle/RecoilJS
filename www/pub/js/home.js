(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ContentController, Data, HomeController, _ref;

    ContentController = require('./content');
    Data = require('./data/home');
    return HomeController = (function(_super) {
      __extends(HomeController, _super);

      function HomeController() {
        _ref = HomeController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      HomeController.prototype.category = 'About';

      HomeController.prototype.title = 'Home';

      HomeController.prototype.data = Data;

      return HomeController;

    })(ContentController);
  });

}).call(this);
