module.exports = {
  entry: {
    'app': './src/main.ts',
    'vendor': 'src/vendor.ts'
  },
  output: {
    filename: '[name].js',
    //As webpack only understand javascript, we need to use loaders to convert ts and css files.
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader'
      }
    ],
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}