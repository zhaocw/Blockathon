const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    // publicPath: '/',
  },
  resolve: {
    alias: {
      contracts: path.resolve('contracts')
    }
  },
  // devtool: 'source-map',
  module: {
    rules: [
      { test: /\.s?css$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'url-loader?name=images/[hash:8].[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'url-loader?name=fonts/[hash:8].[name].[ext]'
        },
      },
      {
        test: /\.json/,
        loader: 'json-loader',
        type: 'javascript/auto',
        exclude : /node_modules/,
      },
      {
        test: /\.sol/,
        use: [
          {
            loader: 'json-loader',
          },
          {
            loader: 'truffle-solidity-loader',
            query: {
              network: 'development',
              // migrations_directory: path.resolve(__dirname, './migrations'),
              // contracts_build_directory: path.resolve(__dirname, '../build/contracts')
            }
          },
        ]

      },
    ]
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin(),
  ],
}

// new CopyWebpackPlugin([
//   { from: './app/index.html', to: 'index.html' }
// ])

// devServer: {
//   port: 3000,
//   inline: true,
//   historyApiFallback: false,
//   colors: true,
//   stats: 'normal'
// }
