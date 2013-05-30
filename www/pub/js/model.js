(function() {
  define(function(require) {
    var Model, SectionController;

    SectionController = require('./section');
    return Model = (function() {
      function Model() {}

      Model.prototype.category = 'Documentation';

      Model.prototype.view = 'coming-soon';

      Model.prototype.title = 'Model';

      return Model;

    })();
  });

}).call(this);
