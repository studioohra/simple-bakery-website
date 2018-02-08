const { resolve } = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV !== "production"
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/main.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
       test: /\.html$/,
       use: "raw-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }],
          fallback: "style-loader"
        })
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file' },
    ]
  },
  devServer: {
    hot: true,
    open: true,
    contentBase: resolve(__dirname, 'dist'),
  },
  plugins: [
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: __dirname + '/src/index.html' }),
    new HtmlWebpackPlugin({ filename: 'about.html' , template: __dirname + '/src/about.html' }),
  ]
}
