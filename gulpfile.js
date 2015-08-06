var gulp       = require('gulp');
var stylus     = require('gulp-stylus');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
// var uglify     = require('gulp-csso');
var del        = require('del');

var paths = {
  custom_scripts: 'assets/js/*.js',
  vendor_scripts: 'assets/js/vendor/*.js',
  custom_styles: 'assets/css/**/*.css'
};

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

// Concatenate & Minify JS
gulp.task('compress_scripts', function() {
    return gulp.src(paths.custom_scripts)
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('concat_scripts', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {

});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['css']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'compress_scripts', 'concat_scripts', 'styles']);
