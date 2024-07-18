const { src, dest } = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const livereload = require('gulp-livereload');

exports.jsScript = function jsScript(srcFile, destFile, dev = false) {
  const srcArray = srcFile.constructor === Array ? srcFile : [srcFile];
  console.log(`building ${dev ? 'dev' : 'prod'} script for ${srcFile}`);

  if (dev) {
    return src(srcArray)
      .pipe(named())
      .pipe(
        webpack(
          {
            devtool: 'eval-cheap-module-source-map',
            mode: 'development',
            output: {
              filename: '[name].js',
            },
            module: {
              rules: [
                {
                  test: /\.js$/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                    },
                  },
                  exclude: /node_modules/,
                },
              ],
            },
          },
          compiler
        )
      )
      .pipe(dest(destFile))
      .pipe(livereload());
  }

  return src(srcArray)
    .pipe(named())
    .pipe(
      webpack(
        {
          devtool: 'source-map',
          mode: 'production',
          output: {
            filename: '[name].min.js',
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
                exclude: /node_modules/,
              },
            ],
          },
        },
        compiler
      )
    )
    .pipe(dest(destFile));
};
