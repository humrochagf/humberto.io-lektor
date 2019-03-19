const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const del = require('del');

const paths = {
  styles: {
    src: 'static/styles/main.scss',
    watchSrc: 'static/styles/*',
    includes: [
      'node_modules/bootstrap/scss',
      'node_modules/@fortawesome/fontawesome-free/scss',
    ],
    dest: 'assets/styles/',
  },
  scripts: {
    src: [
      'node_modules/jquery/dist/jquery.slim.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'static/scripts/**/*.js',
    ],
    dest: 'assets/scripts/',
  },
  images: {
    src: 'static/images/*',
    dest: 'assets/images/',
  },
  fonts: {
    src: [
      'node_modules/@fortawesome/fontawesome-free/webfonts/*',
      'static/fonts/*.ttf',
    ],
    dest: 'assets/fonts/',
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
  gulp.watch(paths.styles.watchSrc, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, fonts));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('watch', watch);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
