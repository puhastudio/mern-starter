var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;

module.exports = {
  devtool: 'source-map',

  entry: [
    __dirname + "/client/index.js"
  ],

  output: {
    path: __dirname + '/static/dist/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'file?name=[name].min.css!extract!css!sass?includePaths[]=' + bourbon
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    })
  ],
};
