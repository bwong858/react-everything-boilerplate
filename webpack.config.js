const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  DIST: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: path.join(PATHS.SRC, 'index.js'),
  output: {
    path: PATHS.DIST,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.SRC, 'index.html')
    })
    // new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    historyApiFallback: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
