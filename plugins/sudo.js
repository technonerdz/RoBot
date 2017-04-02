module.exports = {
	main: function(bot, msg) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (isCommander.indexOf(msg.author.id) > -1) {
			msg.channel.sendMessage(msg.author + " has activated SUDO MODE!");
		} else {
			msg.reply("good try, kiddo :eyes:")
		}
	}
};