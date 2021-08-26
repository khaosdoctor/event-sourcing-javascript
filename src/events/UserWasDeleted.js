const Event = require('../lib/Event')

module.exports = class UserWasDeleted extends Event {
  static eventName = 'user-was-deleted'
  constructor () {
    super(UserWasDeleted.eventName, {})
    Object.defineProperty(UserWasDeleted, 'eventName', { writable: false, configurable: false, enumerable: true })
  }

  static commit (state, event) {
    state.deletedAt = event.timestamp
    state.updatedAt = event.timestamp
    return state
  }
}
