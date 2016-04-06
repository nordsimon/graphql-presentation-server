var graphql = require('graphql')

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

module.exports = currencyType
