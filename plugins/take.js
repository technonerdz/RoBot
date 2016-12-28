module.exports = {
	main: function(bot, message) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (msg.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS') === true || msg.member.hasPermission('ADMINISTRATOR') === true || isCommander.indexOf(message.author.id) > -1) {
			var user = message.mentions.users.array()[0];
			var roleToTake = message.content.split(" ").splice(1).join(" ");
			var role = message.guild.roles.find("name", roleToTake);
			if (!role) {
				message.channel.sendMessage("Role does not exist.");
				return;
			}
			var member = message.guild.members.get(user.id);
			member.removeRole(role);
			message.channel.sendMessage("Successfully removed role " + roleToTake + " from " + user.username + ".");
		}
	}
};