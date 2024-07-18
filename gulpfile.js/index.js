const { watch, parallel, series, src } = require('gulp');
const livereload = require('gulp-livereload');
const { styleScript } = require('./styles');
const { jsScript } = require('./scripts');
const { copyNormalize } = require('./copyNormalize');

function refresh(cb) {
  return src('cdhq-alert.php').pipe(livereload());
}

const bundleStyles = async () => {
  await styleScript('src/styles/styles.scss', 'dist/', true);
  // await styleScript('src/styles/editor-styles.scss', 'dist/', true);
};

function watchFiles(cb) {
  copyNormalize();
  livereload.listen();
  watch(['src/styles/**/*.scss'], bundleStyles);
  watch(['src/scripts/**/*.js'], () => jsScript(['src/scripts/index.js'], 'dist/', true));
  watch(['**/*.php'], refresh);
  cb();
  // watch(['src/index.js', 'src/scripts/**/*.js'], series(devJS, refresh));
  // watch(['src/styles.scss', 'src/styles/**/*.scss'], devScss);
  // watch(['src/images/**/*'], { events: 'add' }, images);
  // watch(['**/*.php'], refresh);
}

async function buildStyles() {
  await copyNormalize(true);
  await copyNormalize();
  await styleScript('src/styles/styles.scss', 'dist/', true);
  await styleScript('src/styles/styles.scss', 'dist/');
}

async function buildScripts() {
  await jsScript('src/scripts/index.js', 'dist/', true);
  await jsScript('src/scripts/index.js', 'dist/');
}

async function build() {
  await buildStyles();
  await buildScripts();
}

exports.watch = watchFiles;
exports.default = build;

// exports.prodJS = prodJS;
// exports.devScss = devScss;
// exports.prodScss = prodScss;
// exports.images = images;
