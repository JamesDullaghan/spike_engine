// Run like this:
// cd client && npm run build:dev

// NOTE: All style sheets handled by the asset pipeline in rails

const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const path = require('path');
const config = require('./webpack.client.base.config');

const devBuild = process.env.NODE_ENV !== 'production';

config.output = {
  path: '../app/assets/javascripts/spike_engine/generated',
  filename: '[name]-bundle.js',
  chunkFilename: '[id]-bundle-[chunkhash].js'
};

// You can add entry points specific to rails here
config.entry.vendor.unshift(
  'es5-shim/es5-shim',
  'es5-shim/es5-sham'
);
config.entry.app.push('./app/startup/clientGlobals');

// See webpack.common.config for adding modules common to both the webpack dev server and rails
config.module.loaders.push(
  {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
  {test: require.resolve('react'), loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham'}
);

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
  module.exports.debug = true;
} else {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ChunkManifestPlugin({
      filename: 'webpack-common-manifest.json',
      manifestVariable: 'webpackBundleManifest'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
