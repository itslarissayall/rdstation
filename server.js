var http = require('http');
var static = require('node-static');

var path = new static.Server(`${__dirname}/src/index.html`)

http.createServer(function (req, res) {
    req.addListener('end', function () {
        path.serve(req, res)
    }).resume()
  }).listen(3000);


console.log('Server running at http://localhost:3000/')