module.exports = {
	name: 'xkcd',
    usage: '<p>xkcd <optional-num>',
    permission: 1,
    help: 'Returns an XKCD comic.',
	main: function(bot, msg) {
		var xkcd = require('xkcd');
		var num = msg.content;
		if (!isNaN(num)) {
			xkcd(num, function (data) {
				try {
					msg.channel.sendMessage("**XKCD #" + data.num + "**: \"" + data.title + "\"\n" + data.img + "\n*" + data.alt + "*");
				} catch (err) {
					msg.channel.sendMessage(err);
				}
				console.log(data);
			});
		} else {
			xkcd(function (data) {
				try {
					msg.channel.sendMessage("**" + data.num + "**: " + data.title + "\n" + data.img + "\n*" + data.alt + "*");
				} catch (err) {
					msg.channel.sendMessage(err);
				}
				console.log(data);
			});
		}
	}
};
