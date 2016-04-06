var userType = require('./user')
var schema

module.exports = {
  type: userType,
  resolve() {
    return require('./userData.json');
  }
}
