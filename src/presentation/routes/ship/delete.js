const rescue = require('express-rescue')
const { HttpError } = require('@expresso/expresso')

const { ShipNotFoundError } = require('../../../domain/ship/errors/ShipNotFoundError')


function factory (service, portService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const ship = await service.delete(req.params.shipId, req.onBehalfOf)
      await portService.undockShip(ship, 'Ship was deleted', req.onBehalfOf)

      res.status(204).end()
    }),
    (err, _req, _res, next) => {
      if (err instanceof ShipNotFoundError) return next(new HttpError.NotFound({ message: err.message, code: 'ship_not_found' }))

      next(err)
    }
  ]
}

module.exports = { factory }
