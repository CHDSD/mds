const path = require('path');

module.exports = {
  entry: [
    './src/index'
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.js',
    publicPath: '/'
  },

  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   loader: 'babel-loader',
      //   include: [
      //     path.resolve(__dirname, 'src')
      //   ]
      // }
    ],
  },

  devtool: 'source-map',

  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }

};