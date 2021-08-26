const { ShipError } = require('./ShipError')
const { format } = require('util')

const MESSAGE = 'Ship with ID "%s" was not found'

class ShipNotFoundError extends ShipError {
  constructor (id) {
    super(format(MESSAGE, id))
  }
}

module.exports = { ShipNotFoundError }
