'use strict';

var gulp = require('gulp');
var del = require('del');

// Load plugins
var $ = require('gulp-load-plugins')();

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

// Styles
gulp.task('styles', function () {
  return gulp.src('app/assets/stylesheets/application.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/assets/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe($.size());
});


// CoffeeScript
gulp.task('coffee', function () {
  return gulp.src(
    ['app/assets/javascript/**/*.coffee', '!app/javascript/**/*.js'],
    {base: 'app/assets/javascript'}
    )
    .pipe(
      $.coffee({ bare: true }).on('error', handleErrors)
    )
    .pipe(gulp.dest('app/assets/javascript'));
});


// Scripts
gulp.task('scripts', function () {
  return gulp.src('app/assets/javascript/application.js')
    .pipe($.browserify({
        insertGlobals: true,
        transform: ['reactify']
    }).on('error', handleErrors))
    .pipe(gulp.dest('public/javascript'))
    .pipe($.size());
});

// HTML
gulp.task('html', function () {
  return gulp.src('app/assets/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('public'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function (cb) {
    del(['public/stylesheets', 'dist/javascript', 'public/images'], cb);
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], function(){
  return gulp.src('./app/assets/*.html')
    .pipe($.useref.assets())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest('public'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch
gulp.task('watch', ['html', 'bundle', 'images'], function () {

    // Watch .html files
    gulp.watch('app/assets/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/assets/stylesheets/**/*.scss', ['styles']);

    // Watch .jade files
    gulp.watch('app/assets/template/**/*.jade', ['jade', 'html']);

    // Watch .coffeescript files
    gulp.watch('app/assets/javascript/**/*.coffee', ['coffee', 'scripts']);


    // Watch .js files
    gulp.watch('app/assets/javascript/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/assets/images/**/*', ['images']);
});
