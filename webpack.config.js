const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['whatwg-fetch', 'babel-polyfill', './client/app/', 'webpack-hot-middleware/client'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/public/'),
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader", options: {
              sourceMap: true
            }
          }, {
            loader: "less-loader", options: {
              sourceMap: true,
              paths: [
                path.resolve(__dirname, './client/app/styles')
              ]
            }
          }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/app/index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
