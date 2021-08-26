const { Event } = require('@irontitan/paradox')
const { ObjectId } = require('mongodb')

class PortWasCreatedEvent extends Event {
  static eventName = 'port-was-created'
  user

  constructor (data, user) {
    super(PortWasCreatedEvent.eventName, data)
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(PortWasCreatedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.id = event.data.id
    state.name = event.data.name
    state.dockedShips = event.data.dockedShips.map((shipId) => new ObjectId(shipId))
    state.createdAt = event.timestamp
    state.createdBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { PortWasCreatedEvent }
