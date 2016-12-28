module.exports = {
	main: function(bot, message){
		if (message.member.hasPermission('ADMINISTRATOR') === true || isCommander.indexOf(message.author.id) > -1) {
			message.channel.sendMessage(":wave: RoBot is restarting...");

			setTimeout(function() {
				bot.logout();
			}, 1000);

			setTimeout(function() {
				process.exit();
			}, 2000);
		}
	}
};
