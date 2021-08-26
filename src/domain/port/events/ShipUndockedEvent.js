const { Event } = require('@irontitan/paradox')

class ShipUndockedEvent extends Event {
  static eventName = 'ship-was-undocked'
  user = ''

  constructor (data, user) {
    super(ShipUndockedEvent.eventName, data)
    Object.defineProperty(this, 'user', { value: user, writable: false, configurable: false })
    Object.defineProperty(ShipUndockedEvent, 'eventName', { writable: false, configurable: false })
  }

  static commit (state, event) {
    state.dockedShips = state.dockedShips.filter((shipId) => !event.data.shipId.equals(shipId))
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}

module.exports = { ShipUndockedEvent }
