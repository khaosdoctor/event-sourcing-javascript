const crypto = require('crypto')
module.exports = (data) => crypto
  .createHash('sha256')
  .update(data)
  .digest('hex')
