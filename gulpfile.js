var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('connect', function () {
  connect.server({
    root: 'public',
    port: 4000
  })
});

gulp.task('browserify', function() {
  // Grabs the app.js file
  return browserify('./app/main.js')
    // bundles it and creates a file called main.js
    .bundle()
    .pipe(source('main.js'))
    // saves it the public/js/ directory
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify']);
});

gulp.task('default', ['connect', 'watch']);