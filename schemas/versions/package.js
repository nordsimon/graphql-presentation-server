var graphql = require('graphql')
var version = require('./version')

var package = new graphql.GraphQLObjectType({
  name: 'NPM_Package',
  fields: () => ({
    name: {
      type: graphql.GraphQLString,
    },
    versions: {
      type: new graphql.GraphQLList(version),
      args: {
        limit: {
          type: graphql.GraphQLInt
        }
      },
      resolve: (root, args) => Object.keys(root.versions)
      .sort((a,b) => b.localeCompare(a))
      .map((key) => root.versions[key])
      .splice(0, args.limit)
    }
  })
})

module.exports = package
