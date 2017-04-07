var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),

    /*
    The HtmlWebpackPlugin, added in webpack.common.js, 
    uses the publicPath and the filename settings to generate 
    appropriate <script> and <link> tags into the index.html.
    */
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',

    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    /*
    The CSS styles are buried inside the Javascript bundles by default. 
    The ExtractTextPlugin extracts them into external .css files that 
    the HtmlWebpackPlugin inscribes as <link> tags into the index.html.
    */
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
