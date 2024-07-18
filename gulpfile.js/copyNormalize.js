const { src, dest } = require('gulp');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

const rename = require('gulp-rename');
const postCSSPlugins = [autoprefixer(), cssnano()];

exports.copyNormalize = function copyNormalize(prod = false) {
  const source = src('node_modules/normalize.css/normalize.css');
  return prod
    ? source
        .pipe(postcss(postCSSPlugins))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist/'))
    : source.pipe(dest('dist/'));
};
