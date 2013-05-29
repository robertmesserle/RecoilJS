(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DataBindingController, SectionController;

    SectionController = require('./section-controller');
    return DataBindingController = (function(_super) {
      __extends(DataBindingController, _super);

      DataBindingController.prototype.view = 'data-binding';

      DataBindingController.prototype.category = 'Documentation';

      DataBindingController.prototype.title = 'Data Binding';

      function DataBindingController() {}

      return DataBindingController;

    })(SectionController);
  });

}).call(this);
