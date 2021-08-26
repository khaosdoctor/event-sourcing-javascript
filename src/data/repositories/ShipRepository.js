const { MongodbEventRepository } = require('@irontitan/paradox')
const { Ship } = require('../../domain')

class ShipRepository extends MongodbEventRepository {
  constructor (connection) {
    super(connection.collection(Ship.collection), Ship)
  }

  async getAll () {
    const documents = await this._collection.find({ 'state.deletedAt': null }).toArray()

    return documents.map(({ events }) => {
      const ship = new Ship()
      ship.setPersistedEvents(events)
      return ship
    })
  }
}

module.exports = { ShipRepository }
