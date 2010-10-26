var redis = require('redis-node').createClient();
exports.publish = function(channel, data) {
	redis.publish('juggernaut', JSON.stringify({channel: channel, data: data}));
}