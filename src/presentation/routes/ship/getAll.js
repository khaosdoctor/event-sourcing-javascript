const rescue = require('express-rescue')


function factory (service) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (_req, res) => {
      const ships = await service.getAll()

      res.status(200).json(ships.map(({ state }) => state))
    })
  ]
}

module.exports = { factory }
