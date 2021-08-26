const Event = require('../lib/Event')

module.exports = class UserWasUpdated extends Event {
  static eventName = 'user-was-updated'
  constructor (data) {
    super(UserWasUpdated.eventName, data)
    Object.defineProperty(UserWasUpdated, 'eventName', { writable: false, configurable: false, enumerable: true })
  }

  static commit (state, event) {
    state.name = event.data.name ?? state.name
    state.password = event.data.password ?? state.password
    state.updatedAt = event.timestamp
    return state
  }
}
