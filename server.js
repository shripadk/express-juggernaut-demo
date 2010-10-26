/**
 * Module dependencies.
 */
require.paths.unshift(__dirname + '/lib/support/juggernaut');
require.paths.unshift(__dirname + '/lib/support/juggernaut-client');

var express = require('express');
var Juggernaut = require('juggernaut');
var publish = require('juggernaut-client').publish;

var app = module.exports = express.createServer();

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
        title: 'Juggernaut-Express demo'
    }
  });
});

app.post('/', function(req, res) {
	var channel = req.body.channel,
			data		= req.body.messagebody;
			
	publish(channel, data);
})

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
	Juggernaut.listen(app);
}