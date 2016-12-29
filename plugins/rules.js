module.exports = {
	main: function(bot, message) {
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
		  .setTitle('The FIRST® Robotics Competition Discord Server')
		  .setAuthor('FIRST® Robotics', 'https://discordapp.com/api/v6/users/176870986900045824/avatars/c48ecf19c0002fe6e36204779d3b5401.jpg')
		  .setColor(0x1675DB)
		  .setDescription('Welcome to our server!')
		  .setFooter('The FIRST® Robotics Competition Discord Server', 
		'https://discordapp.com/api/v6/users/176870986900045824/avatars/c48ecf19c0002fe6e36204779d3b5401.jpg')
		  .setThumbnail('https://discordapp.com/api/v6/users/176870986900045824/avatars/c48ecf19c0002fe6e36204779d3b5401.jpg')
		  .setTimestamp()
		  .setURL('https://discord.gg/FRC')
		  .addField('Server Guidelines', '1) This server is a Graciously Professional space. Use proper judgement at all times.\n2) Pornographic or crude content is ' + 
		  'not allowed. Swearing is allowed, but not excessively.\n3) Do not bash, flame, or roast anything.\n4) Spam is not acceptable in any form, except in ' + 
		'<#176515260516139009> \n5)Your nickname must contain your team number in a readable way.\n6) Do not mention any role without reason to.\n7) Do not post ' + 
		'others personal information without permission.\n\n*Refer to <#253679529745186816> for the complete rules and regulations.*')
		  .addField('Server Information', 'The FIRST® Robotics Competition Discord Server is an unofficial *FIRST®* community platform designed to promote ' + 
		'communication and collaboration between *FIRST®* teams throughout the world and the *FIRST®* community.')
		  .addField('Other Information', '*Check out <#188052258825568260> for the latest server news!*');

		message.channel.sendEmbed(embed,{ disableEveryone: true });
	}
};