var graphql = require('graphql')
var fs = require('fs')
var path = require('path')
var fetch = require('isomorphic-fetch');
var versions = require('../versions')
var readme = require('../readme')
module.exports = new graphql.GraphQLObjectType({
  name: 'Dependency',
  fields: () => ({
    name: {
      type: graphql.GraphQLString,
    },
    version: {
      type: graphql.GraphQLString,
    },
    readme: readme,
    installedVersion: {
      type: graphql.GraphQLString,
      resolve: (root) => (
        new Promise((resolve, reject) => {
          var packagePath = path.resolve(root.path.dir, 'node_modules', root.name,'package.json')
          fs.readFile(packagePath, (err, res) => {
            if(err) return resolve(null)

            resolve(JSON.parse(res).version)
          })
        })
        .catch((err) => console.error(err, err.stack))
      )
    },
    versions: versions
  })
});
