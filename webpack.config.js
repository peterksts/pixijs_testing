const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/app/app.ts'],
  },
  mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  output: {
    filename: 'app.js',
    chunkFilename: 'vendor.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
  },

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      }
    ]
  },

  // context: path.join(__dirname, 'src/assets'),
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
  ],

  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          maxSize: 10000000,
          reuseExistingChunk: true,
        },
      }
    }
  },

  serve: { //object
    port: 1337,
    content: './dist',
    // ...
  },

  // devServer: {
  //   proxy: { // proxy URLs to backend development server
  //     '/api': 'http://localhost:3000'
  //   },
  //   contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
  //   compress: true, // enable gzip compression
  //   historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  //   hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  //   https: false, // true for self-signed, object for cert authority
  //   noInfo: true, // only errors & warns on hot reload
  //   // ...
  // },
};
