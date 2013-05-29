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
      core:
        expand: true
        cwd: 'src'
        src: [ '*.coffee', 'bindings/*.coffee' ]
        dest: 'tmp'
        ext: '.js'
        options:
          bare: true
      www:
        expand: true
        cwd: 'www/src/coffee'
        src: [ '*.coffee' ]
        dest: 'www/pub/js'
        ext: '.js'
    concat:
      core:
        stripBanners: true
        banner: "#{ header.banner }\n\n#{ header.js }\n"
        footer: "#{ footer.js }"
        cwd: 'tmp'
        expand: true
        src: [ 'dirty-check.js', 'router.js', 'main.js', 'bindings/base.js', 'bindings/*.js', 'parser.js', 'core.js' ]
        dest: '../recoil.js'
      wwwVendorJS:
        src: [ 'www/src/vendor/js/*.js' ]
        dest: 'www/pub/vendor/vendor.js'
      wwwVendorCSS:
        src: [ 'www/src/vendor/css/*.css' ]
        dest: 'www/pub/vendor/vendor.css'
    copy:
      www:
        files: [
          { cwd: 'www/src', src: [ '*.html', 'js/*.js', 'vendor/font/**', 'views/*.html', 'img/**' ], dest: '../pub/', expand: true }
          { src: 'recoil.js', dest: 'www/pub/js/recoil.js' }
        ]
    stylus:
      compile:
        options:
          paths: [ 'www/src/stylus' ]
        files:
          'www/pub/css/master.css': 'www/src/stylus/master.styl'
    uglify:
      options:
        mangle: false
        banner: "#{ header.banner }\n\n"
      compile:
        files: 'recoil.min.js': [ 'recoil.js' ]
    watch:
      scripts:
        files: [ 'src/*.coffee', 'src/**/*.coffee', 'www/src/**' ]
        tasks: [ 'coffee', 'concat', 'uglify', 'copy', 'stylus', 'clean' ]
        options:
          livereload: 3001
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
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.registerTask 'default', [ 'coffee', 'concat', 'uglify', 'copy', 'stylus', 'clean' ]
