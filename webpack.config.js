const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/app/app.ts'],
  mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    moduleExtensions: ['node_modules'],
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

  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      title: 'PX_ts',
      template: './src/index.html',
    }),
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
        modules: {
          test: /\.module.ts?$/,
          name(module) {
            let packageName = module.context.substr(module.context.lastIndexOf('/') + 1, module.context.length - 1);
            return `module.${packageName}`;
          },
        }
      },
    },
  },

  serve: { //object
    port: 1339,
    content: './dist',
    // ...
  },

  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
    // contentBase: path.join(__dirname, './dist'), // boolean | string | array, static file location
    // https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
    // compress: true,

    // disableHostCheck: true,
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // compress: true, // enable gzip compression
    contentBase: './dist',
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true,
    watchContentBase: false,
    port: 1339,

    // ...
  },
};
