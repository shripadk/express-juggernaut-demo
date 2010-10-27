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
// Eg: configure(6379, 127.0.0.1, {maxReconnectionAttempts: 10});
// If you don't pass any parameters, then it uses defaults.

configure();

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
			
	publish(channel, data);
	res.send(200);
})

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
  Juggernaut.listen(app);
}