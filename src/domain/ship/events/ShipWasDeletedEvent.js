const { Event } = require('@irontitan/paradox')

class ShipWasDeletedEvent extends Event {
  static eventName = 'ship-was-deleted'
  user = ''

  constructor (user) {
    super(ShipWasDeletedEvent.eventName, {})
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(ShipWasDeletedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.deletedAt = event.timestamp
    state.deletedBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { ShipWasDeletedEvent }
