const Event = require('../lib/Event')

module.exports = class UserWasCreated extends Event {
  static eventName = 'user-was-created'
  constructor (data) {
    super(UserWasCreated.eventName, data)
    Object.defineProperty(UserWasCreated, 'eventName', { writable: false, configurable: false, enumerable: true })
  }

  static commit (state, event) {
    state.id = event.data.id
    state.name = event.data.name
    state.email = event.data.email
    state.password = event.data.password
    state.createdAt = event.timestamp
    state.updatedAt = event.timestamp
    return state
  }
}
