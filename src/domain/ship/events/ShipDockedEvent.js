const { Event } = require('@irontitan/paradox')

class ShipDockedEvent extends Event {
  static eventName = 'ship-docked'
  user = null

  constructor (data, user) {
    super(ShipDockedEvent.eventName, data)
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(ShipDockedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.currentPort = event.data.portId
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { ShipDockedEvent }
