module.exports = {
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
			"\nStatus: " + user.status +
			"\n" + user.avatarURL +
			"```"
		);
	}
};
