(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DownloadController, SectionController;

    SectionController = require('./section-controller');
    return DownloadController = (function(_super) {
      __extends(DownloadController, _super);

      DownloadController.prototype.view = 'download';

      DownloadController.prototype.category = 'About';

      DownloadController.prototype.title = 'Download';

      function DownloadController() {}

      return DownloadController;

    })(SectionController);
  });

}).call(this);
