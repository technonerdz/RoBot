module.exports = {
	main: function(bot, message){
		if(message.author.id === "171319044715053057") {
			bot.sendMessage(message, ":wave: RoBot is restarting...\n*Windows XP shutdown sounds*");
			setTimeout(function() {
				bot.logout()
			}, 1000)
			setTimeout(function() {
				process.exit()
			}, 2000)
		}
	}
};