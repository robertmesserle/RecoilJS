exports.config =

  modules: [ 'require', 'minify' ]

  coffeescript:
    bare: false

  watch:
    sourceDir: 'src'
    javascriptDir: ''
    compiledDir: 'bin'
    throttle: 10

  require:
    optimize:
      overrides:
        name: 'lib/almond'
        out: '../boring.js'
        wrap:
          startFile: 'frags/start.js'
          endFile: 'frags/end.js'