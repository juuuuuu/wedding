var gulp   = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso   = require('gulp-csso');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var del    = require('del');

var paths = {
  scripts: ['src/js/lib/*.js', 'src/js/*.js'],
  styles: 'src/stylus/*.styl'
};

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        // .pipe(notify({ message: 'Scripts task complete' }))
    ;
});

gulp.task('styles', function() {
    return  gulp.src(paths.styles)
        .pipe(stylus())
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
    ;
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['compress_scripts', 'concat_scripts']);
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'styles']);
