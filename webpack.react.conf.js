var path = require('path')
var webpack = require('webpack')
var svgoConfig = require('./svgo-config.json')

module.exports = {
  entry: './react/main.js',
  output: {
    path: path.resolve(__dirname, './dist/react'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    preLoaders: [
      {
        test: /\.svg$/,
        loader: 'svgo-loader?' + JSON.stringify(svgoConfig)
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        exclude: path.resolve(__dirname, './assets/icons/'),
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        }
      }
    ]
  },
  babel: {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime'],
    comments: false,
    cacheDirectory: true
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
