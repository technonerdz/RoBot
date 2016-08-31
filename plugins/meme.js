module.exports = {
	main: function(bot, message) {
		var content = message.content.split(" ").splice(1).join(" "),
			text = content.split('-');
		bot.sendMessage(message, 'http://memegen.link/' + text[0] + '/' + text[1].split(' ').join('-') + '/' + text[2].split(' ').join('-') + '.jpg');

	}
};