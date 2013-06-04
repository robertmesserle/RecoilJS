define ( require ) -> [
  {
    title: 'What is RecoilJS?'
    icon: 'magic'
    content: [
      """Recoil is a light-weight JavaScript framework that provides tools such as two-way data-binding, routing, models, and templating without restricting what you can and can't do as a developer."""
    ]
  }
  {
    title: 'Why Recoil?'
    icon: 'asterisk'
    content: [
      """The most important feature of Recoil is the architecture: Recoil was architected in such a way that it will not limit you as a developer.  It provides a series of tools that you can use; however, it is entirely up to you how much or how little you rely on Recoil."""
      {
        type: 'definitions'
        title: 'Features'
        items: [
          {
            term: 'Two-way Data-binding'
            definition: """Data-binding is a way for you to link your DOM elements to your data, eliminating the hassle of manually syncing your UI to your data."""
          }
          {
            term: 'Templating'
            definition: """Recoil provides an easy templating syntax that gives you access to dynamic features such as logical blocks, iteration, and of course, text replacement.  More importantly, these templates will intelligently re-render as your data changes."""
          }
          {
            term: 'Composition'
            definition: """Composition gives you a way to load in components as controller/view pairs.  This is particularly useful for loading in standalone modules that can be reused throughout the site; however, you can also mix-and-match views and controllers, set the context without loading a view, or load in just a view."""
          }
          {
            term: 'Routing'
            definition: """Recoil provides a simple router that makes setting up single-page applications with linkable sections a breeze."""
          }
          {
            term: 'Limitless Binding'
            definition: """One of the strengths of the method of data-binding used by Recoil is that you can bind to anything - not just models that you create."""
          }
        ]
      }
    ]
  }
  {
    title: 'How does it work?'
    icon: 'question-sign'
    content: [
      """Recoil works by using a process called "dirty-checking."  Basically, when the user interacts with the page, Recoil takes note that the data may have changed and iterates through your data-bindings to see if any UI updates are necessary in order to keep the UI and the data synchronized."""
      """Contrary to many initial assumptions, this does not rely on intervals or timeouts, and instead relies on user-interaction and events to trigger these checks."""
      """While this may sound like a lot of work, it all takes place very efficiently resulting in smooth, seamless UI updates."""
    ]
  }
]