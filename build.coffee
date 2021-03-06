{ exec }   = require 'child_process'
gulp       = require 'gulp'
gutil      = require 'gulp-util'
uglify     = require 'gulp-uglify'
browserify = require 'gulp-browserify'
rename     = require 'gulp-rename'
connect    = require 'gulp-connect'

gulp.task 'default', [ 'test' ], ->
  gulp.src 'src/main.coffee', read: false
    .pipe browserify transform: [ 'coffeeify' ], extensions: [ '.coffee' ]
    .pipe rename 'recoil.js'
    .pipe gulp.dest '.'
    .pipe gulp.dest 'www/pub/js'
    .pipe uglify preserveComments: 'some'
    .pipe rename 'recoil.min.js'
    .pipe gulp.dest '.'

gulp.task 'test', ->
  exec './node_modules/mocha/bin/mocha --colors --recursive --compilers coffee:coffee-script/register', ( e, out, err ) -> gutil.log out, err

gulp.task 'connect', connect.server {
  root: [ __dirname ]
  port: 1337
  livereload: true
  open: browser: 'Google Chrome'
}
    
gulp.task 'watch', [ 'connect' ], -> gulp.watch 'src/**/*.coffee', [ 'default' ]
