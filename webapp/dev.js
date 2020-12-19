const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin'); // Or `import 'base-href-webpack-plugin';` if using typescript

// const WorkBoxPlugin = require('workbox-webpack-plugin')
const path = require('path')

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  // entry: {
  // bundle: './src/index.js'
  //   index: './src/index.js',
  // },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].js'
  // },
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   hot: true,
  //   host: '0.0.0.0',
  //   inline: true
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      publicPath: 'dist/',
      // base: '/',
      baseUrl: 'localhost:5000',
      // publicPath: path.join(__dirname, 'dist')
    }),
  	new BaseHrefWebpackPlugin({ baseHref: '/' }),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
      //   {
      //     src: path.resolve('src/assets/icon.png'),
      //     sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      //   },
        {
          src: path.resolve('src/assets/leaf.png'),
          size: '1024x1024' // you can also use the specifications pattern
        },
      //   {
      //     src: path.resolve('src/assets/maskable-icon.png'),
      //     size: '1024x1024',
      //     purpose: 'maskable'
      //   }
      ]
    }),
    // new WorkBoxPlugin.InjectManifest({
    //   swSrc: './sw.js',
    //   additionalManifestEntries: []
    // })
    // new WorkBoxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // })
  ]
}

const options = {
  // contentBase: __dirname + '/dist',
  contentBase: path.join(__dirname, 'dist'),
  publicPath: 'dist/',
  writeToDisk: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
  hot: true,
  host: '0.0.0.0',
  port: 5000,
  inline: true
}
// options.devServer = {
  // historyApiFallback: { index: 'index.html' },
  // disableDotRule: true,
// }

options.historyApiFallback = true

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, '0.0.0.0', () => {
  console.log('dev server listening on port 5000')
})