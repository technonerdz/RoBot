const Discord = require('discord.js');
const TBA = require('tba-api-storm');
let req = new TBA('FRCDiscord', 'Discord Bot', 1.0);
let embed = new Discord.RichEmbed();

module.exports = {
	main: function(bot, m) {
    req.getTeam(m.content).then(d => {
            embed.setTitle('FRC Team ' + num)
                 .setColor(0x1675DB)
                 .setURL('https://www.thebluealliance.com/team/' + num)
                 .addField('Name', d.nickname)
                 .addField('Location', d.location)
                 .addField('Website', d.website);
            m.channel.sendEmbed(embed);
    }).catch(() => m.channel.sendMessage('Team does not exist'));
	}
};
