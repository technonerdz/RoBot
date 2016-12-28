module.exports = {
	main: function(bot, message){
		if (message.member.hasPermission('ADMINISTRATOR') === true || message.author.id === "171319044715053057") {
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
