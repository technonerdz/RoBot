module.exports = {
	name: 'mute',
    usage: '<p>mute <user>',
    permission: 2,
    help: 'Mutes a specified user.',
	main: function(bot, msg) {
		var mutee = msg.mentions.users.array()[0];
		if (msg.member.hasPermission('KICK_MEMBERS') || msg.member.hasPermission('ADMINISTRATOR')) {
			var member = msg.guild.members.get(mutee.id)
			
		} else {
			msg.reply('you do not have permission to perform this action!');
		}
	}
};