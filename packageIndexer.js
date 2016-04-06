var spawn = require('child_process').spawn;
var ls = spawn('find', [process.argv[2] || process.env.HOME, '-name','package.json']);
var fs = require('fs')
var split2 = require('split2')
var through2 = require('through2')
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'docker:9200',
  log: 'trace'
});
var indexPackage = function(path, pkg) {
  client.index({
    index: 'packages',
    type: 'package',
    id: path,
    body: {
      name: pkg.name,
      license: pkg.license,
      description: pkg.description,
      version: pkg.version,
      dependencies: Object.keys(pkg.dependencies).map(key => ({
        author: pkg.author,
        name: key,
        version: pkg.dependencies[key]
      })),
      author: pkg.author
    }
  });
}

ls.stdout.pipe(split2())
.on('data', (path) => {
  if(path.indexOf('/.') !== -1) return
  if(path.indexOf('node_modules') !== -1) return

  fs.readFile(path, (err, data) => {
    if(err) return console.log(err)

    try {
      var pkg = JSON.parse(data.toString())

      indexPackage(path, pkg)
    } catch (e) {

    }
  })

});

ls.stderr.on('data', (data) => {
  // console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
