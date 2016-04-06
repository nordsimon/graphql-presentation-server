var graphql = require('graphql')
var dependency = require('./dependency')
var path = require('path')
var readme = require('../readme')

var package = new graphql.GraphQLObjectType({
  name: 'Package',
  fields: () => ({
    path: {
      type: graphql.GraphQLString,
      resolve: (root) => root._id
    },
    name: {
      type: graphql.GraphQLString
    },
    dependencies: {
      type: new graphql.GraphQLList(dependency),
      resolve: root => Object.keys(root.dependencies)
      .map(key => ({name: key, version: root.dependencies[key], path: path.parse(root._id)}))
    },
    readme: readme
  })
})

module.exports = package
