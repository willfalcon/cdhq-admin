const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
// const webp = require('gulp-webp');

function images() {
  return src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('./dist'))
    // .pipe(webp())
    // .pipe(dest('./dist'));
}

exports.images = images;
