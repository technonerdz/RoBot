module.exports = {
	name: 'info',
    usage: '<p>info',
    permission: 1,
    help: 'Provides the user with information about the server.',
	main: function(bot, message) {
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
		.setTitle('The FIRST® Robotics Competition Discord Server')
		.setColor(0x1675DB)
		.setDescription('Welcome to our server!')
		.setFooter('Triggered by ' + message.author.username, message.author.avatarURL)
		.setThumbnail('https://discordapp.com/api/v6/users/176870986900045824/avatars/c48ecf19c0002fe6e36204779d3b5401.jpg')
		.setTimestamp()
		.setURL('https://discord.gg/FRC')
		.addField('Server Information', 'The FIRST® Robotics Competition Discord Server is an unofficial *FIRST®* community platform designed to promote communication and collaboration between *FIRST®* '
		+ 'teams throughout the world and the *FIRST®* community. Like other platforms, this is a Graciously Professional space, meant to promote and inspire rather than diminish or deter people from the *FIRST®* community.')
		.addField('Other Information', '*Check out <#188052258825568260> for the latest server news!*');
		message.channel.sendEmbed(embed,{ disableEveryone: true });
	}
};

