(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Data, DocumentationController, ModelController, _ref;

    DocumentationController = require('./reference');
    Data = require('./data/model');
    return ModelController = (function(_super) {
      __extends(ModelController, _super);

      function ModelController() {
        _ref = ModelController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ModelController.prototype.title = 'Model';

      ModelController.prototype.bindings = Data;

      return ModelController;

    })(DocumentationController);
  });

}).call(this);
