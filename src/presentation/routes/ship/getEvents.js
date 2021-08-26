const rescue = require('express-rescue')
const { HttpError } = require('@expresso/expresso')

const { ShipNotFoundError } = require('../../../domain/ship/errors/ShipNotFoundError')

function factory (service) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const ship = await service.find(req.params.shipId)

      res.status(200).json(ship.persistedEvents)
    }),
    (err, _req, _res, next) => {
      if (err instanceof ShipNotFoundError) return next(new HttpError.NotFound({ message: err.message, code: 'ship_not_found' }))

      next(err)
    }
  ]
}

module.exports = { factory }
