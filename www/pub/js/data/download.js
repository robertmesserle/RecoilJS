(function() {
  define(function(require) {
    return [
      {
        icon: 'download',
        title: 'Where can I download Recoil?',
        content: [
          "The best place to download Recoil is from one of the following links (hosted on Github).", {
            type: 'definitions',
            title: 'Files',
            items: [
              {
                term: 'Minified',
                definition: "<a href=\"https://raw.github.com/robertmesserle/RecoilJS/master/recoil.min.js\">https://raw.github.com/robertmesserle/RecoilJS/master/recoil.min.js</a>"
              }, {
                term: 'Development',
                definition: "<a href=\"https://raw.github.com/robertmesserle/RecoilJS/master/recoil.js\">https://raw.github.com/robertmesserle/RecoilJS/master/recoil.js</a>"
              }
            ]
          }
        ]
      }, {
        icon: 'medkit',
        title: 'How can I help make Recoil better?',
        content: [
          "Recoil is still in Alpha, and as such, there may be some undesired behavior.  If you find any bugs, or think of any features that would make Recoil better, please submit it to the Github page and it will be addressed as soon as possible.", {
            type: 'definitions',
            title: 'Links',
            items: [
              {
                term: 'Github',
                definition: "<a href=\"https://github.com/robertmesserle/RecoilJS/\">https://github.com/robertmesserle/RecoilJS/</a>"
              }, {
                term: 'Github Issues',
                definition: "<a href=\"https://github.com/robertmesserle/RecoilJS/issues\">https://github.com/robertmesserle/RecoilJS/issues</a>"
              }
            ]
          }
        ]
      }
    ];
  });

}).call(this);
