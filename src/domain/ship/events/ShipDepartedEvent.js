const { Event } = require('@irontitan/paradox')


class ShipDepartedEvent extends Event {
  static eventName = 'ship-departed'

  constructor (data, user) {
    super(ShipDepartedEvent.eventName, data)
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(ShipDepartedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.currentPort = null
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { ShipDepartedEvent }
