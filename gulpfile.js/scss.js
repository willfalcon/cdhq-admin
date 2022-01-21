const { src, dest } = require('gulp');
const gulpSass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const objectFit = require('postcss-object-fit-images');
const rename = require('gulp-rename');
const streamqueue = require('streamqueue');
const concat = require('gulp-concat');
const sass = require('sass');
const Fiber = require('fibers');
const sassCompiler = gulpSass(sass);

const postCSSPlugins = [autoprefixer(), cssnano(), objectFit];

function devScss() {
  return streamqueue(
    { objectMode: true },
    src('./node_modules/normalize.css/normalize.css').pipe(sourcemaps.init()),
    src('src/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sassCompiler({ fiber: Fiber }).on('error', sassCompiler.logError))
  )
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/'))
    .pipe(livereload());
}

function prodScss() {
  return streamqueue(
    { objectMode: true },
    src('./node_modules/normalize.css/normalize.css').pipe(sourcemaps.init()),
    src('src/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sassCompiler({ fiber: Fiber }).on('error', sassCompiler.logError))
  )
    .pipe(concat('styles.min.css'))
    .pipe(postcss(postCSSPlugins))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/'))
    .pipe(livereload());
}

exports.devScss = devScss;
exports.prodScss = prodScss;
