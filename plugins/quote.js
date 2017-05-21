var unirest = require('unirest');

module.exports = {
	name: 'quote',
    usage: '<p>quote',
    permission: 1,
    help: 'Gets a random quote.',
	main: function(bot, msg) {
		unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1")
			.header("X-Mashape-Key", "rpI2d21SBmmshydu9PNlMzajwrWlp1IzZWZjsnEcELclrOksBU")
			.header("Content-Type", "application/x-www-form-urlencoded")
			.header("Accept", "application/json")
			.end(function (result) {
				console.log(result.body);
				msg.channel.send(result.body.quote + '\n*- ' + result.body.author + '*')
			});
	}
};