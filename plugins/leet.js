module.exports = {
	name: 'leet',
    usage: '<p>leet <message>',
    permission: 1,
    help: 'Returns the input, but in 1337speak.',
	main: function(bot, message) {
		const leet = require('leetspeak');
		message.channel.sendMessage(leet(message.content));
	}
};