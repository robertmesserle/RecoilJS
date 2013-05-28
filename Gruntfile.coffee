module.exports = ( grunt ) ->

  header =
    banner:
      """
      /*! RecoilJS (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/RecoilJS */
      /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
      """
    js:
      """
      ( function ( root, $ ) {
      """

  footer =
    js:
      """
      if ( typeof define === 'function' && define.amd ) define( function () { return Recoil } )
      else root.Recoil = Recoil
      } )( this, jQuery )
      """

  grunt.initConfig
    coffee:
      compile:
        expand: true
        cwd: 'src'
        src: [ '*.coffee', 'bindings/*.coffee' ]
        dest: 'tmp'
        ext: '.js'
        options:
          bare: true
    concat:
      options:
        stripBanners: true
        banner: "#{ header.banner }\n\n#{ header.js }\n"
        footer: "#{ footer.js }"
      dist:
        src: [
          'tmp/dirty-check.js'
          'tmp/router.js'
          'tmp/main.js'
          'tmp/bindings/base.js'
          'tmp/bindings/*.js'
          'tmp/parser.js'
          'tmp/core.js'
        ]
        dest: 'recoil.js'
    uglify:
      options:
        mangle: false
        banner: "#{ header.banner }\n\n"
      compile:
        files: 'recoil.min.js': [ 'recoil.js' ]
    watch:
      scripts:
        files: [ 'src/*.coffee', 'src/**/*.coffee' ]
        tasks: [ 'coffee', 'concat', 'uglify', 'clean' ]
    connect:
      server:
        options:
          port: 8383
          base: '.'
    clean: [ 'tmp' ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', [ 'coffee', 'concat', 'uglify', 'clean' ]
