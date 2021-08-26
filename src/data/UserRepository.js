const fs = require('fs')
const path = require('path')
const User = require('../domain/User')

module.exports = class UserRepository {

  #state = new Map()
  #dbPath = path.resolve(__dirname, './.db.json')
  static instance = null

  get data () { return this.#state }

  constructor () {
    Object.defineProperty(UserRepository, 'instance', { writable: true, configurable: false, enumerable: false })
    if (UserRepository.instance) return UserRepository.instance
    try {
      fs.accessSync(this.#dbPath, fs.constants.F_OK)
      this.#loadFile()
    } catch (err) {
      this.#writeFile()
    }
    UserRepository.instance = this
  }

  save (entity) {
    this.#state.set(entity.id, { id: entity.id, events: entity.events, state: entity.state })
    entity.confirmEvents()
    this.#writeFile()
    return this
  }

  findById (id) {
    const entity = this.#state.get(id)
    if (!entity) return null
    return new User(entity.events)
  }

  #loadFile () {
    const readData = JSON.parse(fs.readFileSync(this.#dbPath, 'utf8'))
    this.#state = Array.isArray(readData) ? new Map(readData) : new Map()
  }

  #writeFile () {
    return fs.writeFileSync(this.#dbPath, JSON.stringify([...this.#state.entries()]))
  }
}
