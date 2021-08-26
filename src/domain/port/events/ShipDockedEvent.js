const { Event } = require('@irontitan/paradox')

class ShipDockedEvent extends Event {
  static eventName = 'ship-was-docked'
  user = ''

  constructor (data, user) {
    super(ShipDockedEvent.eventName, data)
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(ShipDockedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    if (!state.dockedShips.find((shipId) => shipId.equals(event.data.shipId))) state.dockedShips.push(event.data.shipId)
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { ShipDockedEvent }
