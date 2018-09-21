var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');

var paths = {
  styles: {
    src: 'static/styles/main.scss',
    includes: [
      'node_modules/bootstrap/scss',
      'node_modules/font-awesome/scss'
    ],
    dest: 'assets/styles/'
  },
  scripts: {
    src: [
      'node_modules/jquery/dist/jquery.min.js',
      'static/scripts/**/*.js'
    ],
    dest: 'assets/scripts/'
  },
  images: {
    src: 'static/images/*',
    dest: 'assets/images/'
  },
  fonts: {
    src: ['node_modules/font-awesome/fonts/*', 'static/fonts/*.ttf'],
    dest: 'assets/fonts/'
  }
};

function clean() {
  return del([ 'assets' ]);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: paths.styles.includes
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.watch = watch;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts, images, fonts));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);
gulp.task('watch', watch);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
