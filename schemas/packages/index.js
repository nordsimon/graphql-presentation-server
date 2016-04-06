var graphql = require('graphql')
var packageType = require('./package')
var fs = require('fs')

var schema

var fetchPackage = function(hit) {
  return new Promise(function(resolve, reject) {
    fs.readFile(hit._id, (err, res) => {
      if(err) return reject(err)

      try {
        resolve(Object.assign(hit,JSON.parse(res.toString())))

      } catch (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  name: 'Package Schema',
  type: new graphql.GraphQLList(packageType),
  resolve: (res) => {
    return Promise.all(res.hits.hits.map(fetchPackage))
  }
}
