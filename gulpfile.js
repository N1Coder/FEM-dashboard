// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

// Use dart-sass for @use
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
  // Return src can be changed in this case I use main.scss file, u can name everything but don't forget to change the src too
  return src('app/scss/main.scss', { sourcemaps: true })
    .pipe(sass())
    // Cssnano is for minify the css file
    .pipe(postcss([autoprefixer(), cssnano()]))
    // Below this are the destination for your css file
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync
// It works like liveserver, every time you make a changes it will automatically refresh
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(
    // You can delete the 'app/**/*.js' if not using any Javascript file
    ['app/scss/**/*.scss', 'app/js/**/*.js'], {delay: 100},
    series(scssTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask);