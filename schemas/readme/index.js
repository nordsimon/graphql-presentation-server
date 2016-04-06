var npmFetches = require('../npmFetches')
var graphql = require('graphql')

module.exports = {
  type: graphql.GraphQLString,
  resolve: (root, args) => new Promise((resolve, reject) => {
    var url = 'http://registry.npmjs.org/' + root.name

    npmFetches.q.push(url, function (err) {
      if(err) return reject(err)

      resolve(npmFetches.fetches[url].readme)
    });
  })
}
