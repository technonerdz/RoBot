module.exports = {
	main: function(bot, message) {	
		if (message.author.id === "171319044715053057") {
            message.channel.sendMessage("Leaving this server in 5 seconds");
			
			setTimeout(() => {message.guild.leave()}, 5000)
        }
	}
};