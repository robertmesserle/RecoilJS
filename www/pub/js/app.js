(function() {
  define(function(require) {
    var SiteController = require('./site');
    return Recoil.init( new SiteController );
  });
}).call(this);
