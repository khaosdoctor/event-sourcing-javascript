const { server } = require('@expresso/expresso')

const { app } = require('./app')
const { config } = require('../app-config')

function start () {
  server.start(app, config)
}

module.exports = { start }
