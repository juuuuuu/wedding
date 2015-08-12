var gulp   = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso   = require('gulp-csso');
var rename = require('gulp-rename');
var del    = require('del');

var paths = {
  scripts: 'src/js/*.js',
  styles: 'src/stylus/*.styl',
  images: 'src/images/**',
};

gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
  ;
});

gulp.task('styles', function() {
  return  gulp.src(paths.styles)
    .pipe(stylus())
    .pipe(concat('all.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(gulp.dest('dist'))
  ;
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/images'))
  ;
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['clean', 'watch'], function() {
  gulp.start('scripts', 'styles', 'images');
});

