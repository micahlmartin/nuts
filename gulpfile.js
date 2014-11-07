'use strict';

var gulp = require('gulp');
var del = require('del');
var bach = require('bach');

// Load plugins
var $ = require('gulp-load-plugins')();

// NOTE: gulp-rev-looker is used to fix this issue https://github.com/sindresorhus/gulp-rev/issues/55
var rev = require('gulp-rev-looker');

var config = {
  destDir: "./public/assets",
  srcDir: "./app/assets",
  bowerDir: "./app/assets/bower_components",
  isProduction: process.env.NODE_ENV == 'production'
}

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function versionAssets(assets) {
  var revisedAssets = assets.pipe(gulp.dest(config.destDir))
    .pipe(rev())
    .pipe(gulp.dest(config.destDir))

  return revisedAssets.pipe($.addSrc('public/assets/rev-manifest.json'))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.destDir))
    .pipe($.size());
}

function styles() {
  var styles = gulp.src('app/assets/stylesheets/application.scss', {base: config.srcDir})
    .pipe($.rubySass({
      'sourcemap=none': true,
      style: 'expanded',
      precision: 10,
      loadPath: ['app/assets/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.if(config.isProduction, $.cssmin()));

  return versionAssets(styles);
}

function scripts() {
  var scripts = gulp.src('app/assets/javascript/application.js', {base: config.srcDir})
    .pipe($.browserify({
        insertGlobals: true,
        transform: ['reactify'],
        paths: [
          config.bowerDir
        ]
    }).on('error', handleErrors))
    .pipe($.if(config.isProduction, $.jsmin()))

  return versionAssets(scripts);
}

function images() {
  var images = gulp.src('app/assets/images/**/*', {base: config.srcDir})
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))

  return versionAssets(images);
}

function fonts() {
  var fonts = gulp.src(
    config.srcDir + '/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
    {base: config.srcDir}
  );

  return versionAssets(fonts);
}


gulp.task('styles', function () { styles(); });
gulp.task('scripts', function () { scripts(); });
gulp.task('images', function () { images(); });
gulp.task('fonts', function () { fonts(); });
gulp.task('clean', function (cb) { del(['public'], cb); });

gulp.task('build', ['clean'], function(cb) {
  bach.series(styles, scripts, images, fonts)(function(err) {
    if(err) {
      handleErrors(err);
    } else {
      return cb();
    }
  })
})

// Watch
gulp.task('watch', ['build'], function () {

    // Watch .html files
    gulp.watch('app/assets/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/assets/stylesheets/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('app/assets/javascript/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/assets/images/**/*', ['images']);

    // Watch font files
    gulp.watch('app/assets/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*', ['fonts']);
});
