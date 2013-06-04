(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var DataBindingController, ReferenceController, _ref;

    ReferenceController = require('./reference');
    return DataBindingController = (function(_super) {
      __extends(DataBindingController, _super);

      function DataBindingController() {
        _ref = DataBindingController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DataBindingController.prototype.title = 'Data Binding';

      DataBindingController.prototype.data = require('./data/data-binding');

      return DataBindingController;

    })(ReferenceController);
  });

}).call(this);
