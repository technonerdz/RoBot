module.exports = {
	main: function(bot, message) {
		if (message.member.hasPermission('MANAGE_MESSAGES') === true || message.author.id === "171319044715053057") {
			var num = message.content;
			if (!isNaN(num)) {
				message.channel.fetchMessages({limit: num})
					.then(messages => message.channel.bulkDelete(messages))
					.catch(message.channel.bulkDelete);

				message.channel.sendMessage("Deleted " + num + " messages under request of <@" + message.author.id + ">")
				.then(msg => setTimeout(function() {msg.delete()}, 5000));
			} else {
				message.channel.sendMessage("Please specify a number!");
			}
		}
	}
};
