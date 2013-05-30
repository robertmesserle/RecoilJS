(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var PhonebookController, SectionController;

    SectionController = require('./section');
    return PhonebookController = (function(_super) {
      __extends(PhonebookController, _super);

      PhonebookController.prototype.view = 'coming-soon';

      PhonebookController.prototype.category = 'Tutorials';

      PhonebookController.prototype.title = 'Phonebook';

      function PhonebookController() {}

      return PhonebookController;

    })(SectionController);
  });

}).call(this);
