const env = require('sugar-env')

const config = {
  cors: {
    exposedHeaders: ['x-content-range']
  },
  database: {
    mongodb: {
      uri: env.get('DATABASE_MONGODB_URI'),
      dbName: env.get('DATABASE_MONGODB_DBNAME')
    }
  }
}

module.exports = { config }
