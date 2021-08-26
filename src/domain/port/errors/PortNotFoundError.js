const { PortError } = require('./PortError')
const { format } = require('util')

const MESSAGE = 'Port with ID "%s" was not found'

export class PortNotFoundError extends PortError {
  constructor (id: string) {
    super(format(MESSAGE, id))
  }
}
