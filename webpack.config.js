var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry : path.resolve(__dirname + '/src'),

  resolve: {
    alias: {
      'app': path.resolve(__dirname + '/src/app')
    }
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  module: {

    loaders : [
      {
        test : /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'ng-annotate!babel'
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!sass'
      },
      {
        test   : /\.woff/,
        loader : require.resolve("url-loader") + '?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[hash].[ext]'
      },
      {
        test   : /\.ttf/,
        loader : require.resolve("file-loader") + '?prefix=font/&name=assets/[hash].[ext]'
      },
      {
        test   : /\.eot/,
        loader : require.resolve("file-loader") + '?prefix=font/&name=assets/[hash].[ext]'
      },
      {
        test   : /\.svg/,
        loader : require.resolve("file-loader") + '?prefix=font/&name=assets/[hash].[ext]'
      },
    ]
  },

  devServer: {
    port: 8001,
    contentBase: path.resolve(__dirname + '/src')
  },

  plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      })
  ]

}
