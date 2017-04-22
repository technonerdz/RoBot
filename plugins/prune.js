const Discord = require("discord.js");

module.exports = {
	name: 'prune',
    usage: '<p>prune <amount>',
    permission: 2,
    help: 'Prunes messages from the channel.',
	main: function(bot, message) {
		if (message.member.hasPermission('MANAGE_MESSAGES') || message.author.id === "171319044715053057") {
			var num = message.content;
			if (!isNaN(num)) {
				message.channel.fetchMessages({limit: num})
					.then(messages => message.channel.bulkDelete(messages))
					.catch(message.channel.bulkDelete);

				message.channel.sendMessage("Deleted " + num + " messages under request of <@" + message.author.id + ">")
				.then(msg => setTimeout(function() {msg.delete()}, 5000));
				
				/*var p = new Discord.RichEmbed();
				p.setColor(0xFF00FF)
					.setAuthor(message.author.username, message.author.avatarURL)
					.addField('Messages Pruned', `${num} messages were pruned from ${message.channel} by ${message.author}.`)
					.setFooter(`${message.guild.name} | ${message.guild.members.size} members`, `${message.guild.iconURL}`)
					.setTimestamp()
				try {
					var log = message.guild.channels.find('name', 'moderation-logs');
					log.sendEmbed(p);
				} catch (e) {
					message.channel.sendEmbed(p);
				}*/
			} else {
				message.channel.sendMessage("Please specify a number!");
			}
		}
	}
};
