const http = require('http');
const handlers = require('./handlers');

var server = http.createServer(function(req , res) {
  var url = req.url;

  switch(url) {
    case "/generatelink":
      handlers.linkgenerator(req, res);
      break;
    case "/":
      handlers.homepage(req, res);
      break;
      case "/?":
        handlers.homepage(req, res);
        break;
    default:
      handlers.notFound(req, res);
  }
});

server.listen(3033);
