module.exports = {
	main: function(bot, message) {
		var banee = message.mentions.users.array()[0];

		if (message.member.hasPermission('BAN_MEMBERS') === true || message.member.hasPermission('ADMINISTRATOR') === true) {
			try {
				var banned = message.guild.members.get(banee.id);
				var reason = message.content.split(" ").splice(1).join(" ");
				
				if(reason == "")
					var reason = "Not specified.";
				
				banned.ban();

				message.reply(banee + " has been banned.");

				try {
					var log = message.guild.channels.find("name", "mod-log");
					log.sendMessage("ACTION: BAN\nUSER: " + banee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				} catch (e) {
					message.channel.sendMessage("Make a channel called #mod-log.");
					message.channel.sendMessage("ACTION: BAN\nUSER: " + banee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			message.reply(" you do not have permission to do this action");
		}
	}
};
