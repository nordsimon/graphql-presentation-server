var graphql = require('graphql')
var meSchema = require('./me')
var packagesSearch = require('./packagesSearch')

module.exports = function() {

  return Promise.all([meSchema, packagesSearch])
  .then(schemas => {
    return new graphql.GraphQLSchema({
      query: new graphql.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          me: schemas[0],
          packagesSearch: schemas[1]
        }
      })
    });
  })
}
