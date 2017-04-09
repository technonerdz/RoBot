module.exports = {
	main: function(bot, msg) {
		const Discord = require("discord.js");
		var banee = msg.mentions.users.array()[0];

		if (msg.member.hasPermission('BAN_MEMBERS') === true || msg.member.hasPermission('ADMINISTRATOR') === true) {
			try {
				var banned = msg.guild.members.get(banee.id);
				var user = bot.users.get(banee.id);
				var guild = msg.guild;
				var reason = msg.content.split(" ").splice(1).join(" ");
				
				if(reason == "")
					var reason = "Not specified.";
				
				banned.ban();

				msg.reply(banee + " has been successfullly banned.");
				
				var ban = new Discord.RichEmbed();
				ban.setColor(0xFF00FF)
					.setAuthor(user.username, user.avatarURL)
					.addField('Member Banned', `**:hammer: ${user.username}#${user.discriminator} (${user.id}) was banned from the server.**`)
					.addField('Responsible Moderator', msg.author.username)
					.addField('Reason', reason)
					.setFooter(`FRC Discord Server | ${guild.members.size} members`, `${guild.iconURL}`)
					.setTimestamp()

				try {
					var log = msg.guild.channels.get('300441175532503040');
					log.sendEmbed(ban);
				} catch (e) {
					msg.channel.sendEmbed(ban);
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			msg.reply(" you do not have permission to perform this action!");
		}
	}
};
