(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ContentController, Data, DownloadController, _ref;

    ContentController = require('./content');
    Data = require('./data/download');
    return DownloadController = (function(_super) {
      __extends(DownloadController, _super);

      function DownloadController() {
        _ref = DownloadController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DownloadController.prototype.category = 'About';

      DownloadController.prototype.title = 'Download';

      DownloadController.prototype.data = Data;

      return DownloadController;

    })(ContentController);
  });

}).call(this);
