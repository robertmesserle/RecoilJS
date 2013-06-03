(function() {
  define(function(require) {
    return [
      {
        title: 'About',
        sections: [
          {
            title: 'Home',
            href: '#home',
            icon: 'icon-home',
            controller: require('../home')
          }, {
            title: 'Download',
            href: '#download',
            icon: 'icon-download',
            controller: require('../download')
          }, {
            title: 'Samples',
            href: '#samples',
            icon: 'icon-tasks',
            controller: require('../samples')
          }
        ]
      }, {
        title: 'Reference',
        sections: [
          {
            title: 'Configuration',
            href: '#configuration',
            icon: 'icon-cog',
            controller: require('../configuration')
          }, {
            title: 'Data Binding',
            href: '#data-binding',
            icon: 'icon-exchange',
            controller: require('../data-binding')
          }, {
            title: 'Model',
            href: '#model',
            icon: 'icon-book',
            controller: require('../model')
          }, {
            title: 'Router',
            href: '#router',
            icon: 'icon-random',
            controller: require('../router')
          }
        ]
      }, {
        title: 'Tutorials',
        sections: [
          {
            title: 'Getting Started',
            href: '#getting-started',
            icon: 'icon-play',
            controller: require('../getting-started')
          }, {
            title: 'Todo App',
            href: '#tutorials/todo-app',
            icon: 'icon-list',
            controller: require('../todo')
          }, {
            title: 'Phonebook',
            href: '#tutorials/phonebook',
            icon: 'icon-phone',
            controller: require('../phonebook')
          }
        ]
      }
    ];
  });

}).call(this);
