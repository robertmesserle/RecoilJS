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
      name: '../lib/almond'