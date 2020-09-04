const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.config.js')
const options = {
  // contentBase: __dirname + '/dist',
  // publicPath: 'static/'
  // writeToDisk: true,
  hot: true,
  host: '0.0.0.0',
  inline: true
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, '0.0.0.0', () => {
  console.log('dev server listening on port 5000')
})