var config = require('../config.json');
var request = require('request');
var webhook = config.webhook;

module.exports = {
	main: function(bot, message) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (isCommander.indexOf(message.author.id) > -1){
			request.post({
				url: webhook,
				json:{
					"username": "Server Overlord",
					"content": message.content
				}
			});
		}
	}
};
