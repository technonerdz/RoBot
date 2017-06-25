module.exports = {
	name: 'serverlist',
    usage: '<p>serverlist',
    permission: 1,
    help: 'Lists the servers the bot is in.',
	main: function(bot, msg) {
		var str = "";
		var guilds = bot.guilds.array()
		for (var i = 0; i < guilds.length; i++) {
			str += (i+1) + ": " + guilds[i].name + "\n"
		}
		msg.channel.sendMessage(str);
	}
};
