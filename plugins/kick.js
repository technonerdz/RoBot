module.exports = {
	main: function(bot, message) {
		var kickee = message.mentions.users.array()[0];

		if (message.member.hasPermission('KICK_MEMBERS') === true || message.member.hasPermission('ADMINISTRATOR') === true) {
			try {
				var kicked = message.guild.members.get(kickee.id);
				var reason = message.content.split(" ").splice(1).join(" ")
				
				if(reason == "")
					var reason = "Not specified.";

				kicked.kick();
				message.channel.sendMessage(kickee + " has been kicked.");

				try {
					var log = message.guild.channels.find("name", "mod-log");
					log.sendMessage("ACTION: KICK\nUSER: " + kickee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				} catch (e) {
					console.error(e);
					message.channel.sendMessage("Make a channel called #mod-log.");
					message.channel.sendMessage("ACTION: KICK\nUSER: " + kickee.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			message.reply( " you do not have permission to do this!");
		}
	}
};
