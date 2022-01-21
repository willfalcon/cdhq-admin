const { rollup } = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const { babel } = require('@rollup/plugin-babel');
const strip = require('@rollup/plugin-strip');
const livereload = require('gulp-livereload');

async function bundleJS(cb) {
  const bundle = await rollup({
    input: './src/index.js',
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/env'],
      }),
    ],
  });

  await bundle.write({
    file: './dist/bundle.js',
    format: 'umd',
    sourcemap: true,
  });

  livereload();
}

async function bundleAndMinifyJS(cb) {
  const bundle = await rollup({
    input: './src/index.js',
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/env'],
      }),
      terser(),
      strip(),
    ],
  });

  await bundle.write({
    file: './dist/bundle.min.js',
    format: 'umd',
    sourcemap: true,
  });

  livereload();
}

exports.prodJS = bundleAndMinifyJS;
exports.devJS = bundleJS;
