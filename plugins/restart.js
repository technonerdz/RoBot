module.exports = {
	main: function(bot, message){
		if (message.member.roles.exists("name", "Bot Commander")) {
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
