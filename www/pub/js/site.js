(function() {
  define(function(require) {
    var Recoil, SiteController;

    Recoil = require('./recoil');
    return SiteController = (function() {
      SiteController.prototype.view = 'site';

      SiteController.prototype.activeSection = null;

      SiteController.prototype.navSections = [
        {
          title: 'About',
          sections: [
            {
              title: 'Home',
              href: '#home',
              icon: 'icon-home',
              controller: require('./home')
            }, {
              title: 'Download',
              href: '#download',
              icon: 'icon-download',
              controller: require('./download')
            }
          ]
        }, {
          title: 'Documentation',
          sections: [
            {
              title: 'Data Binding',
              href: '#data-binding',
              icon: 'icon-random',
              controller: require('./data-binding')
            }, {
              title: 'Configuration',
              href: '#configuration',
              icon: 'icon-cog',
              controller: require('./configuration')
            }
          ]
        }, {
          title: 'Tutorials',
          sections: [
            {
              title: 'Getting Started',
              href: '#getting-started',
              icon: 'icon-play',
              controller: require('./getting-started')
            }, {
              title: 'Todo App',
              href: '#tutorials/todo-app',
              icon: 'icon-list',
              controller: require('./todo')
            }, {
              title: 'Phonebook',
              href: '#tutorials/phonebook',
              icon: 'icon-phone',
              controller: require('./phonebook')
            }
          ]
        }
      ];

      function SiteController() {
        this.setupRoutes();
      }

      SiteController.prototype.setupRoutes = function() {
        var category, section, _fn, _i, _j, _len, _len1, _ref, _ref1,
          _this = this;

        Recoil.mapDefaultRoute(function() {
          return location.href = _this.navSections[0].sections[0].href;
        });
        _ref = this.navSections;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          category = _ref[_i];
          _ref1 = category.sections;
          _fn = function(section) {
            return Recoil.mapRoute(section.href.substring(1), function() {
              return _this.activeSection = new section.controller;
            });
          };
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            section = _ref1[_j];
            if (!section.controller) {
              continue;
            }
            _fn(section);
          }
        }
        return Recoil.triggerRouteChange();
      };

      return SiteController;

    })();
  });

}).call(this);
