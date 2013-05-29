(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Data, DataBindingController, DocumentationController, _ref;

    DocumentationController = require('./documentation');
    Data = require('./data/data-binding');
    return DataBindingController = (function(_super) {
      __extends(DataBindingController, _super);

      function DataBindingController() {
        _ref = DataBindingController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DataBindingController.prototype.title = 'Data Binding';

      DataBindingController.prototype.bindings = Data;

      return DataBindingController;

    })(DocumentationController);
  });

}).call(this);
