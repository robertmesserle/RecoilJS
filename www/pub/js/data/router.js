(function() {
  define(function(require) {
    return [
      {
        title: 'Mapping a Route',
        syntax: "Recoil.mapRoute( :route, :routeHandler )",
        args: [
          {
            name: ':route',
            html: 'A string representing the route being mapped.'
          }, {
            name: ':routeHandler',
            html: 'A function that will handle the route change.'
          }
        ]
      }
    ];
  });

}).call(this);
