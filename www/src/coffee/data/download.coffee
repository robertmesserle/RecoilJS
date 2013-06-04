define ( require ) -> [
  {
    icon: 'download'
    title: 'Where can I download Recoil?'
    content: [
      """The best place to download Recoil is from one of the following links (hosted on Github)."""
      {
        type: 'definitions'
        title: 'Files'
        items: [
          {
            term: 'Minified'
            definition: """<a href="https://raw.github.com/robertmesserle/RecoilJS/master/recoil.min.js">https://raw.github.com/robertmesserle/RecoilJS/master/recoil.min.js</a>"""
          }
          {
            term: 'Development'
            definition: """<a href="https://raw.github.com/robertmesserle/RecoilJS/master/recoil.js">https://raw.github.com/robertmesserle/RecoilJS/master/recoil.js</a>"""
          }
        ]
      }
    ]
  }
  {
    icon: 'medkit'
    title: 'What if I find a bug?'
    content: [
      """Recoil is still in Alpha, and as such, may contain some bugs.  If you find any, please submit it to the Github page and it will be addressed as soon as possible."""
      {
        type: 'definitions'
        title: 'Links'
        items: [
          {
            term: 'Github'
            definition: """<a href="https://github.com/robertmesserle/RecoilJS/">https://github.com/robertmesserle/RecoilJS/</a>"""
          }
          {
            term: 'Github Issues'
            definition: """<a href="https://github.com/robertmesserle/RecoilJS/issues">https://github.com/robertmesserle/RecoilJS/issues</a>"""
          }
        ]
      }
    ]
  }
]