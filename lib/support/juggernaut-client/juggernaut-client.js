var redis;

exports.configure = function(options) {
	redis = require('redis').createClient(options);
}

exports.publish = function(channel, data, socketId) {
	redis.publish('juggernaut', JSON.stringify({channel: channel, data: data, except: socketId}));
}