var graphql = require('graphql')

var version = new graphql.GraphQLObjectType({
  name: 'NPM_Version',
  fields: () => ({
    version: {
      type: graphql.GraphQLString,
    },
  })
})

module.exports = version
