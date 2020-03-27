const { watch, parallel, series, src } = require('gulp');
const livereload = require('gulp-livereload');

const { devJS, prodJS } = require('./js');
const { devScss, prodScss } = require('./scss');
const { images } = require('./images');

function refresh(cb) {
  return src('cdhq-alert.php').pipe(livereload());
}

function watchFiles() {
  livereload.listen();
  watch(['src/index.js', 'src/scripts/**/*.js'], series(devJS, refresh));
  watch(['src/styles.scss', 'src/styles/**/*.scss'], devScss);
  // watch(['src/images/**/*'], { events: 'add' }, images);
  watch(['**/*.php'], refresh);
}

exports.watch = watchFiles;
exports.default = parallel(series(devJS, prodJS), prodScss);
exports.prodJS = prodJS;
exports.devScss = devScss;
exports.prodScss = prodScss;
exports.images = images;
