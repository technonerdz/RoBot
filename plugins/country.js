var unirest = require('unirest');
var Discord = require('discord.js');

module.exports = {
	name: 'country',
    usage: '<p>country <country-name>',
    permission: 1,
    help: 'Gets information about a country.',
	main: function(bot, msg) {
		msg.content = msg.content.replace(" ", "%20")
		unirest.get("https://restcountries-v1.p.mashape.com/name/" + msg.content)
		.header("X-Mashape-Key", "rpI2d21SBmmshydu9PNlMzajwrWlp1IzZWZjsnEcELclrOksBU")
		.header("Accept", "application/json")
		.end(function (result) {
			console.log(result.body[0]);
			var res = result.body;
			for(var i = 0; i < res.length; i++) {
				var country = new Discord.RichEmbed();
				country.setTitle(res[i].name)
				.setDescription('Country Information')
				.addField('Capital', res[i].capital)
				.addField('Population', res[i].population)
				.addField('Demonym', res[i].demonym)
				.setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
				.setTimestamp()
				msg.channel.sendEmbed(country);
			}
		});
	}
};