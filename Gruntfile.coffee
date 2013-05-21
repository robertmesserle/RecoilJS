module.exports = ( grunt ) ->

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
        banner:
          """
          /*! BoringJS (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/BoringJS */
          /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
          (function($){
          \n
          """
        footer: "})(jQuery);"
      dist:
        src: [
          'tmp/main.js'
          'tmp/globals.js'
          'tmp/overrides.js'
          'tmp/bindings/base.js'
          'tmp/bindings/*.js'
          'tmp/parser.js'
          'tmp/core.js'
        ]
        dest: 'boring.js'
    uglify:
      options:
        mangle: false
        banner:
          """
          /*! BoringJS (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/BoringJS */
          /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
          \n
          """
      compile:
        files:
          'boring.min.js': [ 'boring.js' ]
    watch:
      scripts:
        files: [ 'src/*.coffee', 'src/**/*.coffee' ]
        tasks: [ 'coffee', 'concat', 'uglify', 'clean' ]
    clean: [ 'tmp' ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', [ 'coffee', 'concat', 'uglify', 'clean' ]
