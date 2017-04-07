var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  //Tell Webpack to resolve extension-less file requests by looking 
  //for matching files with .ts extension or .js extension
  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        // a loader to transpile the Typescript code to ES5,
        // guided by the tsconfig.json file
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 
          // loads angular components' template and styles.
          'angular2-template-loader'
        ]
      },
      {
        // for component templates.
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // Images and fonts are bundled as well.
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        // matches application-wide styles
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        // The ExtractTextPlugin (described below) applies the style and css loaders to these files.
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        // handles component-scoped styles
        // (the ones specified in a component's styleUrls metadata property)
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    // The CommonsChunkPlugin identifies the hierarchy among three chunks: 
    // app -> vendor -> polyfills. Where Webpack finds that app has shared
    // dependencies with vendor, it removes them from app. 
    // It would remove polyfills from vendor if they shared dependencies, which they don't.
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    //Webpack generates a number of js and CSS files. 
    //You could insert them into the index.html manually.
    //That would be tedious and error-prone. Webpack can inject those scripts and links for you with the HtmlWebpackPlugin.
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
