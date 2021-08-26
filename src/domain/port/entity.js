const { ObjectId } = require('mongodb')
const { EventEntity } = require('@irontitan/paradox')
const { PortWasCreatedEvent } = require('./events/PortWasCreatedEvent')
const { ShipUndockedEvent } = require('./events/ShipUndockedEvent')
const { ShipDockedEvent } = require('./events/ShipDockedEvent')
const { PortWasDeletedEvent } = require('./events/PortWasDeletedEvent')

module.exports = class Port extends EventEntity {
  id = null
  name = null
  dockedShips = null
  createdAt = null
  createdBy = null
  updatedAt = null
  updatedBy = null
  deletedAt = null
  deletedBy = null

  static collection = 'ports'

  constructor () {
    super({
      [PortWasCreatedEvent.eventName]: PortWasCreatedEvent.commit,
      [ShipUndockedEvent.eventName]: ShipUndockedEvent.commit,
      [ShipDockedEvent.eventName]: ShipDockedEvent.commit,
      [PortWasDeletedEvent.eventName]: PortWasDeletedEvent.commit
    })
    Object.defineProperty(Port, 'collection', { writable: false, configurable: false })
  }

  static create (params, user) {
    const port = new Port()

    port.pushNewEvents([
      new PortWasCreatedEvent({ id: new ObjectId(), ...params }, user)
    ])

    return port
  }

  undockShip (ship, reason, user) {
    this.pushNewEvents([
      new ShipUndockedEvent({ shipId: ship.id, reason }, user)
    ])

    return this
  }

  dockShip (ship, user) {
    this.pushNewEvents([
      new ShipDockedEvent({ shipId: ship.id }, user)
    ])

    return this
  }

  delete (user) {
    this.pushNewEvents([
      new PortWasDeletedEvent(user)
    ])

    return this
  }

  get state () {
    const currentState = this.reducer.reduce(new Port(), [
      ...this.persistedEvents,
      ...this.pendingEvents
    ])

    return {
      id: currentState.id,
      name: currentState.name,
      dockedShips: currentState.dockedShips,
      createdAt: currentState.createdAt,
      createdBy: currentState.createdBy,
      updatedAt: currentState.updatedAt,
      updatedBy: currentState.updatedBy,
      deletedAt: currentState.deletedAt,
      deletedBy: currentState.deletedBy
    }
  }
}
