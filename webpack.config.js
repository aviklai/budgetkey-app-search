'use strict';

var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglify-js-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
  }),
  new HtmlWebpackPlugin({
    template: 'index.html'
  })
];

if (process.env.NODE_ENV == 'production') {
  plugins.push(new UglifyJsPlugin({
    sourceMap: true
  }));
}

module.exports = {
  entry: {
    'main': ['./app/main.ts', './app/common.less'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{loader: 'raw-loader'}, {loader: 'less-loader'}]
        })
      },
      {
        test: /\.css/,
        loader: 'raw-loader'
      },
      {
        test: /\.xlf/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html']
  },
  plugins: plugins
};
