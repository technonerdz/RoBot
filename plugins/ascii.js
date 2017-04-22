module.exports = {
	name: 'ascii',
    usage: '<p>ascii',
    permission: 1,
    help: 'Returns a random ASCII face.',
	main: function(bot, message) {
		const cool = require('cool-ascii-faces')
		message.channel.sendMessage(cool());
	}
};
