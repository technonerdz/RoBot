var config = require('../webhooks.json');
var unirest = require('unirest');
var webhook = config.moderators;

module.exports = {
	main: function(bot, message) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (isCommander.indexOf(message.author.id) > -1){
			unirest.post(webhook)
                .send({"username": "Server Administrators", "content": message.content})
                .end(function (response) {
                    console.log(response.body);
                });
			message.delete();
		}
	}
};