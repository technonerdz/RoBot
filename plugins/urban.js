module.exports = {
	main: function(bot, message) {
		var urban = require('urban'),
		definition = urban(message.content);
		try {
			definition.first(function(def) {
				if(def != undefined) {
					const Discord = require('discord.js');
					const embed = new Discord.RichEmbed()
					  .setTitle(def.word)
					  .setColor(0x1675DB)
					  .setDescription('Urban Dictionary')
					  .setFooter('Triggered by ' + message.author.username, message.author.avatarURL)
					  .setThumbnail('https://lh5.googleusercontent.com/-rY97dP0iEo0/AAAAAAAAAAI/AAAAAAAAAGA/xm1HYqJXdMw/s0-c-k-no-ns/photo.jpg')
					  .setTimestamp()
					  .addField('Definition', def.definition, false)
					  .addField('Example', def.example, false)
					  .addField('Other Information', def.thumbs_up + ' :thumbsup: | ' + def.thumbs_down + ' :thumbsdown: \nAuthor: ' + def.author, false);
					message.channel.sendEmbed(embed,{ disableEveryone: true });
				}
				else {
					message.channel.sendMessage("Could not find word.");
				}
			});
		}
		catch(err) {
			message.channel.sendMessage("An error occurred.");
		}
	}
};
