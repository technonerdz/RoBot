module.exports = {
	name: 'emoji',
    usage: '<p>emoji',
    permission: 1,
    help: 'Returns a random emoji.',
	main: function(bot, message) {
		var emoji = require('emoji-random');
		message.channel.send(emoji.random());
	}
};