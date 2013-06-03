(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var SectionController, TodoController;

    SectionController = require('./section');
    return TodoController = (function(_super) {
      __extends(TodoController, _super);

      TodoController.prototype.view = 'todo';

      TodoController.prototype.category = 'Tutorials';

      TodoController.prototype.title = 'Todo App';

      function TodoController() {}

      return TodoController;

    })(SectionController);
  });

}).call(this);
