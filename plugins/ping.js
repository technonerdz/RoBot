module.exports = {
	main: function(bot, message) {
		var start = new Date(message.timestamp).getTime();

		message.channel.sendMessage("Pong!")
			.then(msg => msg.edit("Hello, pong! You're on the " + message.channel.guild.name + " server.\nTook " + (message.timestamp.getTime() - start) + " ms to respond."))
			.catch(msg.edit);
	}
};
