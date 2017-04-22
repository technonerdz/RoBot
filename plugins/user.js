module.exports = {
	name: 'user',
    usage: '<p>user <optional-mention>',
    permission: 1,
    help: 'Provides information about a user.',
	main: function(bot, message) {
		if (message.mentions.users.array()[0] == null) {
			var member = message.guild.members.get(message.author.user.id);
		} else {
			var user = message.mentions.users.array()[0];
			var member = message.guild.members.get(user.id);
		}
		
		var roles = member.roles.map(r => " " + r.name);

		message.channel.sendMessage(
			"```xml" +
			"\nName: " + user.username +
			"\nNickname: " + member.nickname +
			"\nDiscriminator: " + user.discriminator +
			"\nID: " + user.id +
			"\nRoles: " + roles +
			"\nStatus: " + user.presence.status +
			"\nAvatar URL: " + user.avatarURL +
			"```"
		);
	}
};
