var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify');

gulp.task('update-bootstrap-sass-base', function () {
  gulp.src(['./node_modules/bootstrap/scss/*.scss'])
    .pipe(gulp.dest('./assets/static/scss/bootstrap'))
    .pipe(notify("Bootstrap sass updated!"));
});

gulp.task('update-bootstrap-sass-mixins', function () {
  gulp.src(['./node_modules/bootstrap/scss/mixins/*.scss'])
    .pipe(gulp.dest('./assets/static/scss/bootstrap/mixins'))
    .pipe(notify("Bootstrap sass updated!"));
});

gulp.task('update-bootstrap-js', function () {
  gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('./assets/static/js'))
    .pipe(notify("Bootstrap js updated!"));
});

gulp.task('update-tether-js', function () {
  gulp.src(['./node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest('./assets/static/js'))
    .pipe(notify("Tether js updated!"));
});

gulp.task('sass-website', function () {
  gulp.src('./assets/static/scss/website.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest('./assets/static/css'))
    .pipe(notify("Website styles compiled"));
});

gulp.task('update-assets', [
  'update-bootstrap-sass-base',
  'update-bootstrap-sass-mixins',
  'update-bootstrap-js',
  'update-tether-js'
]);

gulp.task('watch', function() {
  gulp.watch('./assets/static/scss/**/*.scss', ['sass-website']);
});

gulp.task('default', ['sass-website', 'watch']);
