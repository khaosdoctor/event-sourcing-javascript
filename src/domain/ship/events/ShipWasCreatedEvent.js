const { Event } = require('@irontitan/paradox')
const { ObjectId } = require('mongodb')

class ShipWasCreatedEvent extends Event {
  static eventName = 'ship-was-created'
  user = ''

  constructor (data, user) {
    super(ShipWasCreatedEvent.eventName, data)
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(ShipWasCreatedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.id = event.data.id
    state.name = event.data.name
    state.currentPort = new ObjectId(event.data.currentPort)
    state.createdAt = event.timestamp
    state.createdBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { ShipWasCreatedEvent }
