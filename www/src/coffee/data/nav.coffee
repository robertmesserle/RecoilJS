define ( require ) -> [
  {
    title: 'About'
    sections: [
      { title: 'Home', href: '#home', icon: 'icon-home', controller: require '../home' }
      { title: 'Download', href: '#download', icon: 'icon-download', controller: require '../download' }
    ]
  }
  {
    title: 'Documentation'
    sections: [
      { title: 'Data Binding', href: '#data-binding', icon: 'icon-random', controller: require '../data-binding' }
      { title: 'Configuration', href: '#configuration', icon: 'icon-cog', controller: require '../configuration' }
    ]
  }
  {
    title: 'Tutorials'
    sections: [
      { title: 'Getting Started', href: '#getting-started', icon: 'icon-play', controller: require '../getting-started' }
      { title: 'Todo App', href: '#tutorials/todo-app', icon: 'icon-list', controller: require '../todo' }
      { title: 'Phonebook', href: '#tutorials/phonebook', icon: 'icon-phone', controller: require '../phonebook' }
    ]
  }
]