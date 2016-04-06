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


var currencyType = new graphql.GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    currency_offset: {
      type: graphql.GraphQLInt,
    },
    usd_exchange: {
      type: graphql.GraphQLFloat,
    },
    usd_exchange_inverse: {
      type: graphql.GraphQLFloat,
    },
    user_currency: {
      type: graphql.GraphQLString,
    },
  })
});

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    bio: {
      type: graphql.GraphQLString,
    },
    id: {
      type: graphql.GraphQLString,
    },
    first_name: {
      type: graphql.GraphQLString,
    },
    last_name: {
      type: graphql.GraphQLString,
    },
    name: {
      type: graphql.GraphQLString,
      resolve: (root) => (root.name) ? root.name : [root.first_name, root.last_name].join(' ')
    },
    currency: {
      type: currencyType,
      resolve: (root) => root.currency
    },
    cover: {
      type: coverType,
      resolve: (root) => root.cover
    },
    friends: {
      type: new graphql.GraphQLList(userType),
      resolve: (root) => root.friends.data,
    }
  })
});

module.exports = userType
