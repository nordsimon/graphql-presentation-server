var esGraphQL = require('elasticsearch-graphql')
var graphql = require('graphql')
var packagesSchema = require('../packages')
var util = require('util')

module.exports = esGraphQL({
  graphql: graphql,
  name: 'packagesSearch',
  mapping: require('./mapping.json'),
  elastic: {
    host: 'http://localhost:9200',
    index: 'packages',
    type: 'package',
    query: function(query, context) {
      return query
    }
  },
  hitsSchema: packagesSchema
})
