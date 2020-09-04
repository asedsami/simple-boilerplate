const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const app = express()

// app.use(express.static('./public'))
app.use(compression())
app.disable('x-powered-by')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.json({success: true})})
// require('./error-handlers.js').init(app)

// require('./cron-jobs')

const httpServer = http.createServer(app)

httpServer.listen(4000, '0.0.0.0', function listening() {
  console.log('Ahanio API is running at http://localhost:%d', httpServer.address().port);
})

module.exports = app