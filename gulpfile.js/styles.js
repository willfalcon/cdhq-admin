const { src, dest } = require('gulp');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const postCSSPlugins = [autoprefixer(), cssnano()];

exports.styleScript = function styleScript(srcFile, destFile, dev = false) {
  if (dev) {
    // Just process development stylesheet
    return src(srcFile)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(dest(destFile))
      .pipe(livereload());
  }
  // process development and production stylesheets
  return src(srcFile)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(destFile))
    .pipe(postcss(postCSSPlugins))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write())
    .pipe(dest(destFile))
    .pipe(livereload());
};
