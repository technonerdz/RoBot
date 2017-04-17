module.exports = {
	main: function(bot, msg) {
		var mutee = msg.mentions.users.array()[0];
		if (msg.member.hasPermission('KICK_MEMBERS') === true || msg.member.hasPermission('ADMINISTRATOR') === true) {
			
		} else {
			msg.reply('you do not have permission to perform this action!');
		}
	}
};