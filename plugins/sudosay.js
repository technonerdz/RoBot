module.exports = {
	name: 'sudosay',
    usage: 'sudosay',
    permission: 3,
    help: 'Makes the bot say something.',
	main: function(bot, message) {
		if (message.author.id === "171319044715053057" || message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.sendMessage(message.content);
			message.delete();
		}
	}
};
