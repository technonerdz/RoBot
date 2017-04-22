module.exports = {
	name: 'createchan',
    usage: '<p>createchan <channel>',
    permission: 2,
    help: 'Creates a channel of the specified name.',
	main: function(bot, message) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (isCommander.indexOf(message.author.id) > -1){
			try {
				const channelToCreate = message.content;
				message.guild.createChannel(channelToCreate, 'text')
				.then(chan => message.channel.sendMessage("Alright, I have created the channel <#" + chan.id + ">!"))
			}
			catch(err) {
				console.log(err);
				message.channel.sendMessage("ERR: " + err);
			}
		}
	}
};