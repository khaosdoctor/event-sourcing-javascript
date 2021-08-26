const { MongodbEventRepository } = require('@irontitan/paradox')
const { Port } = require('../../domain')

class PortRepository extends MongodbEventRepository {
  constructor (connection) {
    super(connection.collection(Port.collection), Port)
  }

  async getAll () {
    const documents = await this._collection.find({ 'state.deletedAt': null }).toArray()
    return documents.map(({ events }) => {
      const port = new Port()
      return port.setPersistedEvents(events)
    })
  }
}

module.exports = { PortRepository }
