var graphql = require('graphql')

var coverType = new graphql.GraphQLObjectType({
  name: 'Cover',
  fields: () => ({
    offset_y: {
      type: graphql.GraphQLInt,
    },
    source: {
      type: graphql.GraphQLString,
    },
    id: {
      type: graphql.GraphQLString,
    },
  })
});

module.exports = coverType
