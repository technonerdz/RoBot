const Discord = require('discord.js');

module.exports = {
	name: 'user',
    usage: '<p>user <optional-mention>',
    permission: 1,
    help: 'Provides information about a user.',
	main: function(bot, msg) {
		if (msg.mentions.users.array()[0] == null)
			var member = msg.guild.members.get(msg.author.user.id);
		else
			var member = msg.guild.members.get(msg.mentions.users.array()[0].id);
		
		var roles = member.roles.map(r => " " + r.name);
		
		var user = new Discord.RichEmbed()
		.setTitle(user.username)
		.setDescription("User Information")
		.setColor(0x1675DB)
		.setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
		.setTimestamp();
		.setThumbnail(user.avatarURL)
		.addField('Username', user.username, true)
		.addField('Display Name', member.displayName, true)
		.addField('Discriminator', user.discriminator, true)
		.addField('ID', user.id, true)
		.addField('Account Created', new Date(user.createdAt), true)
		.addField('Join Date', new Date(member.joinedAt), true)
		.addField('Bot', user.bot, true)
		.addField('Status', user.presence.status, true)
		.addField('Game', user.presence.game.name || 'None', true)
		.addField('Roles', roles, true)
		.addField('Color', member.displayHexColor, true)
		.addField('Highest Role', member.highestRole.name, true)
		
		msg.channel.send({embed:user})
	}
};
