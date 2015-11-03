// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack');
const path = require('path');

module.exports = {

  // the project dir
  context: __dirname,

  entry: {
    // See use of 'vendor' in the CommonsChunkPlugin inclusion below
    vendor: [
      'babel-core/polyfill',
      'jquery',
      'react',
      'react-dom'
    ],

    app: [],
  },
  resolve: {
    // Solve double loading React with Redux Devtools
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },

    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js'],
  },
  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({
      // Name 'vendor' ties into entry definition
      name: 'vendor',
      filename: 'vendor-bundle.js',
      minChunks: Infinity
    }),
  ],
  module: {
    loaders: [
      // React is necessary for the client rendering:
      {test: require.resolve('react'), loader: 'expose?React'},
      {test: require.resolve('react-dom'), loader: 'expose?ReactDOM'},
      {test: require.resolve('jquery'), loader: 'expose?jQuery'},
      {test: require.resolve('jquery'), loader: 'expose?$'},
    ]
  },
};
