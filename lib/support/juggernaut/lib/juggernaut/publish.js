var sys     = require("sys");
var redis   = require("redis-client");
var Message = require("./message");
var Channel = require("./channel");

Publish = module.exports = {};
Publish.listen = function(){
  this.client = redis.createClient();
  this.client.subscribeTo("juggernaut", function(_, data) {
    sys.log("Received: " + data);
    
    try {
      var message = Message.fromJSON(data);
    } catch(e) { console.log(JSON.stringify(e)); return; }
    
    Channel.publish(message);
  });
};