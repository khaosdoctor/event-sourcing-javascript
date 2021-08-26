
const rescue = require('express-rescue')


function factory (service) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (_req, res) => {
      const ports = await service.getAll()

      res.status(200).json(ports.map(({ state }) => state))
    })
  ]
}

module.exports = { factory }
