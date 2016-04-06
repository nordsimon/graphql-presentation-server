var async = require('async')
var fetch = require('isomorphic-fetch');

var CONCURRENCY = 10

var fetches = {}
var q = async.queue(function (task, callback) {
  if(fetches[task]) {
    return callback()
  }
  console.log('FETCHING', task)
  fetch(task)
  .then(function(response) {
    if (response.status >= 400) {
      callback(new Error("Bad response from server"))
    }
    return response.json();
  })
  .then(function(res) {
    fetches[task] = res

    callback()
  })
  .catch((err) => {
    callback(err)
  })
}, CONCURRENCY);

module.exports = {
  q: q,
  fetches: fetches
}
