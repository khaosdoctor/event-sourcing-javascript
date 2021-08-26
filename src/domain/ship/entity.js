const { ObjectId } = require('mongodb')
const { ShipWasCreatedEvent } = require('./events/ShipWasCreatedEvent')
const { ShipWasDeletedEvent } = require('./events/ShipWasDeletedEvent')
const { ShipDepartedEvent } = require('./events/ShipDepartedEvent')
const { ShipDockedEvent } = require('./events/ShipDockedEvent')
const { EventEntity } = require('@irontitan/paradox')

module.exports = class Ship extends EventEntity {
  id = null
  name = null
  currentPort = null
  createdAt = null
  createdBy = null
  updatedAt = null
  updatedBy = null
  deletedAt = null
  deletedBy = null

  static collection = 'ships'

  constructor () {
    super({
      [ShipWasCreatedEvent.eventName]: ShipWasCreatedEvent.commit,
      [ShipWasDeletedEvent.eventName]: ShipWasDeletedEvent.commit,
      [ShipDepartedEvent.eventName]: ShipDepartedEvent.commit,
      [ShipDockedEvent.eventName]: ShipDockedEvent.commit
    })
    Object.defineProperty(Ship, 'collection', { writable: false, configurable: false })
  }

  static create (params, user) {
    const ship = new Ship()

    ship.pushNewEvents([
      new ShipWasCreatedEvent({ id: new ObjectId(), ...params }, user)
    ])

    return ship
  }

  delete (user) {
    this.pushNewEvents([
      new ShipWasDeletedEvent(user)
    ])

    return this
  }

  depart (reason, user) {
    this.pushNewEvents([
      new ShipDepartedEvent({ reason }, user)
    ])

    return this
  }

  dock (port, user) {
    this.pushNewEvents([
      new ShipDockedEvent({ portId: port.id }, user)
    ])

    return this
  }

  get state () {
    const currentState = this.reducer.reduce(new Ship(), [
      ...this.persistedEvents,
      ...this.pendingEvents
    ])

    return {
      id: currentState.id,
      name: currentState.name,
      currentPort: currentState.currentPort,
      createdAt: currentState.createdAt,
      createdBy: currentState.createdBy,
      updatedAt: currentState.updatedAt,
      updatedBy: currentState.updatedBy,
      deletedAt: currentState.deletedAt,
      deletedBy: currentState.deletedBy
    }
  }
}
