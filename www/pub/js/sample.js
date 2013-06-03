(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var SampleController, SectionController;

    SectionController = require('./section');
    return SampleController = (function(_super) {
      __extends(SampleController, _super);

      SampleController.prototype.view = 'sample';

      SampleController.prototype.category = 'About';

      SampleController.prototype.title = 'Sample';

      function SampleController() {}

      return SampleController;

    })(SectionController);
  });

}).call(this);
