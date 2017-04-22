module.exports = {
	name: 'unmute',
    usage: '<p>unmute <user>',
    permission: 1,
    help: 'Unmutes a muted user.',
	main: function(bot, msg) {
		var mutee = msg.mentions.users.array()[0];
		if (msg.member.hasPermission('KICK_MEMBERS') || msg.member.hasPermission('ADMINISTRATOR')) {
			var member = msg.guild.members.get(mutee.id)
			
		} else {
			msg.reply('you do not have permission to perform this action!');
		}
	}
};