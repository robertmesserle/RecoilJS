(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ContentController, SectionController, _ref;
    SectionController = require('./section');
    return ContentController = (function(_super) {
      __extends(ContentController, _super);

      function ContentController() {
        _ref = ContentController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ContentController.prototype.view = 'content';

      return ContentController;

    })(SectionController);
  });

}).call(this);
