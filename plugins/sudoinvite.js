module.exports = {
	name: 'sudoinvite',
    usage: '<p>sudoinvite <server name>',
    permission: 3,
    help: 'Sends you an invite to the given server.',
	main: function(bot, message) {
		if (message.author.id === "171319044715053057") {
			const serverToInvite = message.content;
			message.channel.send("Alright I am sending you an invite to " + serverToInvite + "!");
			try {
				var server = bot.guilds.find('name', serverToInvite);
				var chan = bot.channels.get(server.id);
				chan.createInvite()
				.then(i => {
					message.author.send("https://discord.gg/" + i.code);
				});
			}
			catch(err) {
				console.log(err);
			}
        }
	}
};