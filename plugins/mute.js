module.exports = {
	name: 'mute',
    usage: '<p>mute <user>',
    permission: 2,
    help: 'Mutes a specified user.',
	main: function(bot, msg) {
		const Discord = require("discord.js");
		var mutee = msg.mentions.users.array()[0];
		if (msg.member.hasPermission('KICK_MEMBERS') || msg.member.hasPermission('ADMINISTRATOR')) {
			var reason = msg.content.split(" ").splice(1).join(" ");
			var user = bot.users.get(mutee.id);
			var guild = msg.guild;
			var member = msg.guild.members.get(mutee.id);
			var channels = msg.guild.channels.array();
			
			for(var i = 0; i < channels.length; i++) {
				if(channels[i].type == 'text')
					channels[i].overwritePermissions(member, {SEND_MESSAGES: false})
			}
			msg.reply(member + ' has been muted.')
			
			var mute = new Discord.RichEmbed();
			
			mute.setColor(0xFF0000)
				.setAuthor(user.username, user.avatarURL)
				.addField('Member Muted', `**${user.username}#${user.discriminator} (${user.id}) was muted.**`)
				.addField('Responsible Moderator', msg.member.displayName)
				.addField('Reason', reason)
				.setFooter(`${guild.name}`, `${guild.iconURL}`)
				.setTimestamp()
			try {
				var log = msg.guild.channels.find('name', 'mod-logs');
				log.sendEmbed(mute);
			} catch (e) {
				msg.channel.sendEmbed(mute);
			}
		} else {
			msg.reply('you do not have permission to perform this action!');
		}
	}
};