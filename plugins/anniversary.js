module.exports = {
	name: 'giveme',
    usage: '<p>anniversary',
    permission: 1,
    help: 'Gives the user the One Year role',
	main: function(bot, msg) {
		if(msg.guild.id == '176186766946992128') {
			var role = msg.guild.roles.get('308258215953432577');
			var member = msg.member;
			member.addRole(role).catch(console.error);
			msg.channel.sendMessage("Successfully gave you " + role.name + "!");
		}
	}
};
