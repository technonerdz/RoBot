module.exports = {
	name: 'giveme',
	usage: '<p>giveme <rolename>',
	permission: 1,
	help: 'Gives the user a specified role from an allowed list.',
	main: function(bot, msg) {
		return msg.channel.send("Hey! Please use RoBot Beta's giveme command instead! It's a lot better!")
		
		if (msg.guild.id == '176186766946992128') {
			allowedRoles = ['Gaming', 'Wiring', 'Build', 'Programming', 'Marketing', 'Design', 'Awards', 'Strategy', 'Politics', 'Java', 'C++', 'LabVIEW', 'Python', 'Media', 'CS:GO', 'Civilization', 'CAH', 'League of Legends', 'Overwatch', 'Rocket League', 'Minecraft', 'ChezyChamps', 'Hackathon', 'Alumni', 'Solidworks', 'Inventor', 'Creo', 'Social'];
		} else if (msg.guild.id == '225450307654647808') {
			allowedRoles = ['Social'];
		}
		var cmd = msg.content.split(" ")[0];
		
		if(cmd == "list" | cmd == "-l") {
			var list = "List of Allowed Roles:";
			for (var i = 0; i < allowedRoles.length; i++)
				list += "\n" + allowedRoles[i];
			msg.channel.send(list);
		}
		
		var allowedRoles = [];
		var assigned = "";
		var assignedCount = 0;
		var alreadyHad = "";
		var alreadyHadCount = 0;
		var notFoundCount = 0;
		if(msg.content.indexOf("|") > -1) {
			var 
			for(var i = 0; i < )
		}
		else {
			var roleToGive = msg.content.trim().toLowerCase(),
				found = false,
				role = null;
			
		}
		var role = null;
		for (var i = 0; i < allowedRoles.length; i++) {
			if (allowedRoles[i].toLowerCase() == roleToGive) {
				found = true;
				role = msg.guild.roles.find("name", allowedRoles[i]);
			}
		}
		if (found == true) {
			var member = msg.member;
			member.addRole(role).catch(console.error);
			msg.channel.send("Successfully gave you " + role.name + "!");
		} else if (roleToGive == "list" || roleToGive == "-l") {
			
		} else {
			msg.reply('that giveme does not exist!');
		}
	}
};
