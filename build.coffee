gulp       = require( 'gulp' )
browserify = require( 'gulp-browserify' )
rename     = require( 'gulp-rename' )
connect    = require( 'gulp-connect' )

gulp.task( 'coffee', ->
  gulp.src( 'src/main.coffee', { read: false } )
    .pipe( browserify( { transform: [ 'coffeeify' ], extensions: [ '.coffee' ] } ) )
    .pipe( rename( 'recoil.js' ) )
    .pipe( gulp.dest( '.' ) )
    .pipe( connect.reload() )
)
gulp.task( 'connect', connect.server( {
  root: [ __dirname ]
  port: 1337
  livereload: true
  open: { browser: 'Google Chrome' }
} ) )

gulp.task( 'default', [ 'coffee' ] )

gulp.task( 'watch', [ 'connect' ], ->
  gulp.watch( 'src/**/*.coffee', [ 'coffee' ] )
)
