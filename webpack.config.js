// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',

  devServer: {
    static: './dist',
  },

  resolve: {
    fallback: {
      // Node‐core modules your code (or Webpack itself) might try to pull in:
      fs: false,
      'fs/promises': false,
      os: false,
      path: false,
      util: false,
      vm: false,
      worker_threads: false,
      url: false,
      crypto: false,
      stream: false,
      zlib: false,
      assert: false,
      inspector: false,
      buffer: false,
      constants: false,
      module: false,
      querystring: false,
      http: false,
      https: false,
      tty: false,
      // …and any others that show up in “Can’t resolve” errors
    },
    alias: {
      // block any heavy Node-only packages entirely:
      'jest-worker': false,
      'loader-runner': false,
      'terser-webpack-plugin': false,
      'graceful-fs': false,
      'watchpack': false,
      'chokidar': false,
      'eslint-scope': false,
      'chrome-trace-event': false,
      // …and any others you encounter
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  // ↓ add this to filter out the “dependency is an expression” warning
  stats: {
    warningsFilter: [
      /the request of a dependency is an expression/,
    ],
  },
};
