const rescue = require('express-rescue')
const { validate } = require('@expresso/expresso')


function factory (service) {
  return [
    /**
     * Route validation
     * ==================
     */
    validate({
      type: 'object',
      properties: {
        name: { type: 'string' },
        dockedShips: {
          type: 'array',
          items: { type: 'string' },
          default: []
        }
      },
      required: ['name'],
      additionalProperties: false
    }),
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const port = await service.create(req.body, req.onBehalfOf)

      res.status(201)
        .json(port.state)
    })
  ]
}

module.exports = { factory }
