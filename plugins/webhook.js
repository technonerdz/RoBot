var config = require('../config.json');
var unirest = require('unirest');
var webhook = config.webhook;

module.exports = {
	main: function(bot, message) {
		var options = {
			username: "Server Overlord",
			content: message.content
		}
		
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (isCommander.indexOf(message.author.id) > -1){
			unirest.post(webhook)
				.send({"username": 23, "content": message.content})
				.end(function (response) {
					console.log(response.body);
				});
			message.delete();
		}
	}
};
