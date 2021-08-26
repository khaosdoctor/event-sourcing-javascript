class Event {
  constructor (name, data, id = null) {
    Object.defineProperties(this, {
      id: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: id || Date.now().toString(16)
      },
      name: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: name
      },
      data: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: data
      },
      timestamp: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: new Date()
      }
    })
  }
}

module.exports = Event
