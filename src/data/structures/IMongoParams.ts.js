const { MongoClientOptions } = require('mongodb')

export default interface IMongoParams {
  uri: string,
  dbName: string,
  options: MongoClientOptions
}
