var imdb = require('imdb-api');
var Discord = require('discord.js');

module.exports = {
	name: 'movie',
	usage: '<p>movie <movie-name>',
	permission: 1,
	help: 'Gets information about a movie.',
	main: function(bot, msg) {
		imdb.get(msg.content).then(d => {
			console.log(d);
			var m = new Discord.RichEmbed()
			if(d.type == 'movie') {
				m.setImage(d.poster)
				.setTitle(d.title)
				.setDescription('Movie Information')
				.setURL(d.imdburl)
				.addField('Release Date', new Date(d.released).toLocaleDateString('en-US'), true)
				.addField('Rating', d.runtime, true)
				.addField('Genres', d.genres, true)
				.addField('Duration', d.runtime, true)
				.addField('Rating', d.rating + '/10', true)
				.addField('Votes', d.votes, true)
				.addField('Description', d.plot)
			}
			
			msg.channel.sendEmbed(m);
		});
	}
};