var express = require('express')
var cors = require('cors')
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql')
var meSchema = require('./schemas/me')

var app = express();

var packagesSearch = require('./schemas/packagesSearch')

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      me: meSchema,
      packagesSearch: packagesSearch
    }
  })
});

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(8090)
