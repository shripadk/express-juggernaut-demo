/**
 * Module dependencies.
 */
require.paths.unshift(__dirname + '/lib/support/juggernaut');
require.paths.unshift(__dirname + '/lib/support/juggernaut-client');

var express 				= require('express');
var Juggernaut 			= require('juggernaut');
var configureClient = require('juggernaut-client').configure,
		publish 				= require('juggernaut-client').publish;

var app = module.exports = express.createServer();

// Configure your Redis client here!

configureClient();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index.jade', {
    locals: {
        title: 'Express-Juggernaut demo'
    }
  });
});

app.post('/', function(req, res) {
	var channel = req.body.channel,
			data		= req.body.messagebody;
	res.send(200);
})

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
	Juggernaut.listen(app);
}

	Juggernaut.Connection.include({
	  init: function(stream){
	    this.stream     = stream;
	    this.session_id = this.stream.sessionId;
	    this.client     = new Client(this);

	    this.stream.on("message", this.proxy(this.onmessage));
	    this.stream.on("disconnect", this.proxy(this.ondisconnect));
	  },
	  onmessage: function(data){
	    console.log("Received: " + data);
			if(data.search("~j~") == 0) {
				data = data.replace("~j~", "");
			}
			
	    try {
	      var message = Message.fromJSON(data);
	    } catch(e) { return; }

	    switch (message.type){
	      case "subscribe":
					this.client.channel = message.channel;
	        this.client.subscribe(message.getChannel());
	      break;
	      case "unsubscribe":
	        this.client.unsubscribe(message.getChannel());
	      break;
				case "publish":
					publish(message.channel, message.data, this.client.session_id);
				break;
	      case "meta":
	        this.client.setMeta(message.data);
	      break;
	      case "event":
	        this.client.event(message.data);
	      break;
	      default:
	        throw "Unknown type"
	    }
	  },

	  ondisconnect: function(){
			this.client.unsubscribe(this.client.channel);
	    this.client.disconnect();
	  },

	  write: function(message){
	    if (typeof message.toJSON == "function")
	      message = message.toJSON();
	    this.stream.send(message);
	  }
	});
