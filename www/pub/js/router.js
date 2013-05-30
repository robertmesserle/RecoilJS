(function() {
  define(function(require) {
    var Router, SectionController;

    SectionController = require('./section');
    return Router = (function() {
      function Router() {}

      Router.prototype.category = 'Documentation';

      Router.prototype.view = 'coming-soon';

      Router.prototype.title = 'Router';

      return Router;

    })();
  });

}).call(this);
