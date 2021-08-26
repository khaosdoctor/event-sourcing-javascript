const { Event } = require('@irontitan/paradox')

class PortWasDeletedEvent extends Event {
  static eventName = 'port-was-deleted'
  user = ''

  constructor (user) {
    super(PortWasDeletedEvent.eventName, {})
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(PortWasDeletedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.deletedAt = event.timestamp
    state.deletedBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { PortWasDeletedEvent }
