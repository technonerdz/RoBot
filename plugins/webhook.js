var config = require('../config.json');
var request = require('request');
var webhook = config.webhook;

module.exports = {
	main: function(bot, message) {
		request.post({
			url: webhook,
			json:{
				"username": "Server Overlord",
				"content": message.content
			}
		});
	}
};
