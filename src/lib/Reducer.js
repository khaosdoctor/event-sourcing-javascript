const cloneDeep = require('lodash.clonedeep')
class Reducer {
  #knownEvents = []

  constructor (knownEvents) {
    this.#knownEvents = knownEvents
  }

  reduce (state, events) {
    return events.reduce((state, event) => {
      const clonedState = cloneDeep(state)
      return this.#knownEvents[event.name](clonedState, event)
    }, state)
  }
}

module.exports = Reducer
