module.exports = {
	main: function(bot, message) {
		const cool = require('cool-ascii-faces')
		message.channel.sendMessage(cool());
	}
};
