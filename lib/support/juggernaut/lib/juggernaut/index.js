require("./ext/array");

var Publish = require("./publish");
var Server  = require("./server");

module.exports.listen = function(app){
  Publish.listen();
  var server = new Server;
  server.listen(app);
};