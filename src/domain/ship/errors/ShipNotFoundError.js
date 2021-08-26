const { ShipError } = require('./ShipError')
const { format } = require('util')

const MESSAGE = 'Ship with ID "%s" was not found'

export class ShipNotFoundError extends ShipError {
  constructor (id: string) {
    super(format(MESSAGE, id))
  }
}
