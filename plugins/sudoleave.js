module.exports = {
	main: function(bot, message) {	
		if (message.author.id === "171319044715053057") {
            message.channel.sendMessage("Leaving this server in 5 seconds :ok_hand:");
			
			setTimeout(() => {message.guild.leave()}, 5000)
			bot.users.get("171319044715053057").sendMessage("I left " + message.guild.name);
        }
	}
};