const rescue = require('express-rescue')
const { validate } = require('@expresso/expresso')

function factory (service, portService) {
  return [
    /**
     * Route validation
     * ==================
     */
    validate({
      type: 'object',
      properties: {
        name: { type: 'string' },
        currentPort: { type: 'string' }
      },
      required: ['name', 'currentPort'],
      additionalProperties: false
    }),
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const ship = await service.create(req.body, req.onBehalfOf)
      if (ship.currentPort) await portService.dockShip(ship, req.onBehalfOf)

      res.status(201)
        .json(ship.state)
    })
  ]
}

module.exports = { factory }
