const { PortError } = require('./PortError')
const { format } = require('util')

const MESSAGE = 'Port with ID "%s" was not found'

class PortNotFoundError extends PortError {
  constructor (id) {
    super(format(MESSAGE, id))
  }
}

module.exports = { PortNotFoundError }
