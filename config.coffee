exports.config =

  paths:
    public: '.'
    app: 'src'
  
  files:
    javascripts:
      defaultExtension: 'coffee'
      joinTo:
        'boring.js': /^src/
      order:
        before: [
          'src/main.coffee'
          'src/globals.coffee'
          'src/overrides.coffee'
          'src/bindings/base.coffee'
        ]
        after: [
          'src/parser.coffee'
          'src/core.coffee'
        ]

  modules:
    wrapper: false