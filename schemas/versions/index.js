var graphql = require('graphql')
var fs = require('fs')
var path = require('path')
var version = require('./version')

module.exports = {
  type: new graphql.GraphQLList(version),
  args: {
    limit: {
      type: graphql.GraphQLInt
    }
  },
  resolve: (root, args) => new Promise((resolve, reject) => {
    var url = 'http://registry.npmjs.org/' + root.name
    var npmFetches = require('../npmFetches')

    npmFetches.q.push(url, function (err) {
      if(err) return reject(err)
      if(!npmFetches.fetches[url] || !npmFetches.fetches[url].versions) return

      var versions = Object.keys(npmFetches.fetches[url].versions)
      .sort((a,b) => b.localeCompare(a))
      .map((key) => npmFetches.fetches[url].versions[key])
      .splice(0, args.limit || 10)

      resolve(versions)
    });
  })
}
