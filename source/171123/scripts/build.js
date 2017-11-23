'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const Webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const compiler = Webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('err: ', err);
  }
});
