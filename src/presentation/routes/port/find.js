const rescue = require('express-rescue')
const { HttpError } = require('@expresso/expresso')

const { PortNotFoundError } = require('../../../domain/port/errors/PortNotFoundError')

function factory (service) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const port = await service.find(req.params.portId)

      res.status(200).json(port.state)
    }),
    (err, _req, _res, next) => {
      if (err instanceof PortNotFoundError) return next(new HttpError.NotFound({ message: err.message, code: 'port_not_found' }))

      next(err)
    }
  ]
}

module.exports = { factory }
