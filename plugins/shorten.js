var googl = require('goo.gl');
var config = require('../config.json');
const Discord = require("discord.js");

module.exports = {
	name: 'shorten',
    usage: '<p>shorten <URL>',
    permission: 1,
    help: 'Shortens a URL.',
	main: function(bot, msg) {
		googl.setKey(config.googl);
        
		googl.shorten(msg.content)
		.then(function (shortURL) {
			msg.channel.sendMessage('URL shortened to ' + shortURL)
		})
		.catch(function (err) {
			msg.channel.sendMessage(err);
			console.error(err.message);
		});
	}
};