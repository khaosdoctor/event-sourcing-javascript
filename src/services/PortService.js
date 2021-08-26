const { Port } = require('../domain')
const { PortNotFoundError } = require('../domain/port/errors/PortNotFoundError')

class PortService {
  #repository = null
  constructor (repository) {
    this.#repository = repository
  }

  async create (params, user) {
    const port = Port.create(params, user)
    return this.#repository.save(port)
  }

  async undockShip (ship, reason, user) {
    if (!ship.currentPort) return

    const port = await this.#repository.findById(ship.currentPort)
    if (!port) return
    if (!port.dockedShips.find((dockedShip) => dockedShip.equals(ship.id))) return

    port.undockShip(ship, reason, user)

    await this.#repository.save(port)
  }

  async dockShip (ship, user) {
    if (!ship.currentPort) return

    const port = await this.#repository.findById(ship.currentPort)

    if (!port) throw new PortNotFoundError(ship.currentPort.toHexString())
    if (port.dockedShips.find((dockedShip) => dockedShip.equals(ship.id))) return

    port.dockShip(ship, user)
    await this.#repository.save(port)
  }

  async delete (portId, user) {
    const port = await this.#repository.findById(portId)

    if (!port) throw new PortNotFoundError(portId)

    port.delete(user)

    return this.#repository.save(port)
  }

  async find (id) {
    const port = await this.#repository.findById(id)

    if (!port) throw new PortNotFoundError(id)

    return port
  }

  async getAll () {
    return this.#repository.getAll()
  }
}

module.exports = { PortService }
