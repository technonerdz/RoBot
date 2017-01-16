module.exports = {
	main: function(bot, msg) {
		const allowedRoles = ['Gaming', 'Wiring', 'Build', 'Programming', 'Marketing', 'Design', 'Awards', 'Strategy', 'Politics', 'Java', 'C++', 'LabVIEW', 'Python', 'Media'];
		var roleToGive = msg.content;
		roleToGive = roleToGive.trim().toLowerCase();
		var found = false;
		var role = null;
		for(var i = 0; i < allowedRoles.length; i++) {
			if(allowedRoles[i].toLowerCase() == roleToGive) {
				found = true;
				role = msg.guild.roles.find("name", allowedRoles[i]);
			}
		}
		if (found == true) {
			var member = msg.member;
			member.addRole(role).catch(console.error);
			msg.channel.sendMessage("Successfully gave you " + role.name + "!");
		} else if(roleToGive == "list") {
			var list = "List of Allowed Roles:";
			for(var i = 0; i < allowedRoles.length; i++) {
				list += "\n" + allowedRoles[i];
			}
			msg.channel.sendMessage(list);
		} else {
			msg.reply('that giveme does not exist!');
		}
	}
};