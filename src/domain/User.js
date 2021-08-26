const UserWasCreated = require('../events/UserWasCreated')
const UserWasUpdated = require('../events/UserWasUpdated')
const UserWasDeleted = require('../events/UserWasDeleted')
const Reducer = require('../lib/Reducer')
const hash = require('../lib/hasher')

module.exports = class User {
  id = null
  name = null
  email = null
  password = null
  createdAt = null
  updatedAt = null
  deletedAt = null

  static collection = 'users'

  #reducer = null
  #pendingEvents = []
  #persistentEvents = []

  constructor (persistedEvents = []) {
    this.#reducer = new Reducer({
      [UserWasCreated.eventName]: UserWasCreated.commit,
      [UserWasUpdated.eventName]: UserWasUpdated.commit,
      [UserWasDeleted.eventName]: UserWasDeleted.commit
    })
    Object.defineProperty(User, 'collection', { writable: false, configurable: false, enumerable: true })

    if (persistedEvents.length > 0) {
      this.#persistentEvents = persistedEvents
      this.#updateInternalState()
    }
  }

  // -- INTERNAL -- //
  #updateInternalState () {
    const state = this.state
    for (const propertyName of Object.keys(state)) {
      this[propertyName] = state[propertyName]
    }
  }

  pushEvents (events = []) {
    this.#pendingEvents = this.#pendingEvents.concat(events)
    this.#updateInternalState()
    return this
  }

  confirmEvents () {
    this.#persistentEvents = this.#persistentEvents.concat(this.#pendingEvents)
    this.#pendingEvents = []
    return this
  }

  // -- ACCESSORS -- //
  get events () {
    return [
      ...this.#persistentEvents,
      ...this.#pendingEvents
    ]
  }

  set events (value) {
    this.#persistentEvents = value
    this.#updateInternalState()
  }

  get state () {
    const currentState = this.#reducer.reduce(new User(), this.events)
    return { ...currentState }
  }

  // -- BUSINESS -- //

  static create (creationParams = null) {
    if (!'name' in creationParams || !'email' in creationParams) throw new Error('User.create: missing params')
    const user = new User()
    user.pushEvents([new UserWasCreated({ ...creationParams, id: hash(creationParams.email) })])
    return user
  }

  delete () {
    this.pushEvents([new UserWasDeleted()])
    return this
  }

  update (data) {
    this.pushEvents([new UserWasUpdated(data)])
    return this
  }
}
