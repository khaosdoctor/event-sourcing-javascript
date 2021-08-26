const { ObjectId } = require('mongodb')
const { Ship } = require('../domain')
const { ShipNotFoundError } = require('../domain/ship/errors/ShipNotFoundError')

class ShipService {
  #repository
  #portService

  constructor (repository, portService) {
    this.repository = repository
    this.#portService = portService
  }

  async create (creationParams, user) {
    const ship = Ship.create(creationParams, user)

    return this.#repository.save(ship)
  }

  async delete (shipId, user) {
    const ship = await this.#repository.findById(shipId)
    if (!ship) throw new ShipNotFoundError(shipId)

    ship.delete(user)
    return this.#repository.save(ship)
  }

  async depart (shipId, reason, user) {
    const obj = new ObjectId(shipId)
    const ship = await this.#repository.findById(obj)

    if (!ship) throw new ShipNotFoundError(obj.toHexString())
    if (!ship.currentPort) return ship

    await this.#portService.undockShip(ship, reason, user)

    ship.depart(reason, user)
    return this.#repository.save(ship)
  }

  async dock (shipId, portId, user) {
    const ship = await this.#repository.findById(shipId)

    if (!ship) throw new ShipNotFoundError(shipId)
    if (ship.currentPort && ship.currentPort.toHexString() === portId) return ship

    const port = await this.#portService.find(portId)
    ship.dock(port, user)

    await this.#portService.dockShip(ship, user)
    return this.#repository.save(ship)
  }

  async find (id) {
    const ship = await this.#repository.findById(id)

    if (!ship) throw new ShipNotFoundError(id)

    return ship
  }

  async getAll () {
    return this.#repository.getAll()
  }
}

module.exports = { ShipService }
