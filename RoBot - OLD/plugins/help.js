const fse = require('fs-extra');

module.exports = {
	main: function(bot, message) {
		bot.sendMessage(message.author, fse.readFileSync(__dirname + '/help.txt'));
	}
};