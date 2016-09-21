module.exports = {
	main: function(bot, msg) {
		var mutee = msg.mentions.users.array()[0];

		if (msg.member.roles.exists("name", "Bot Commander")) {
			try {
				var muted = msg.guild.members.find("id", mutee.id);

				muted.removeRole("muted");
				msg.reply(mutee + " has been unmuted.");

				try {
					var log = message.guild.channels.find("name", "mod-log");
					log.sendMessage("ACTION: UNMUTE\nUSER: " + mutee.username + "\nModerator: " + message.author.username);
				} catch (e) {
					console.error(e);
					message.channel.sendMessage("Make a channel called #mod-log.");
					message.channel.sendMessage("ACTION: UNMUTE\nUSER: " + mutee.username + "\nModerator: " + message.author.username);
				}
			} catch (e) {
				msg.channel.sendMessage("Muted Role does not exist");
			}
		} else {
			msg.reply("You do not have permission to do this action");
		}
	}
};
