var esGraphQL = require('elasticsearch-graphql')
var graphql = require('graphql')
var packagesSchema = require('../packages')


module.exports = esGraphQL({
  graphql: graphql,
  name: 'ordersSearch',
  mapping: require('./mapping.json'),
  elastic: {
    host: 'docker:9200',
    index: 'packages',
    type: 'package'
  },
  hitsSchema: packagesSchema
})
