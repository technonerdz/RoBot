module.exports = {
	main: function(bot, message) {
		var cmds = require('./commands.json');
		var team = message.content.split(" ").splice(1).join(" ");
		bot.sendMessage(message, cmds.frccopypasta + team + cmds.frccopypastapt2);
	}
};