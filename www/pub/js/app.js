(function() {
  define(function(require) {
    var Recoil, SiteController;
    Recoil = require('./recoil');
    SiteController = require('./site');
    return Recoil.init(new SiteController);
  });

}).call(this);
