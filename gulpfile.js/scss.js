const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const objectFit = require('postcss-object-fit-images');
const rename = require('gulp-rename');
const streamqueue = require('streamqueue');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

const postCSSPlugins = [
  autoprefixer(), 
  // cssnano(),
  objectFit
];

function devScss() {
  return streamqueue(
    { objectMode: true },
    src('./node_modules/normalize.css/normalize.css')
      .pipe(sourcemaps.init()),
    src('src/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)),
  )
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/'))
    .pipe(livereload());
}

function prodScss() {
  return streamqueue(
    { objectMode: true },
    src('./node_modules/normalize.css/normalize.css')
      .pipe(sourcemaps.init()),
    src('src/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)),
  )
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/'))
    .pipe(postcss(postCSSPlugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/'));
}

exports.devScss = devScss;
exports.prodScss = prodScss;
