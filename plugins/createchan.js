module.exports = {
	name: 'createchan',
    usage: '<p>createchan <channel>',
    permission: 2,
    help: 'Creates a channel of the specified name.',
	main: function(bot, msg) {
		if (msg.member.hasPermission('MANAGE_CHANNELS')){
			try {
				const channelToCreate = msg.content;
				msg.guild.createChannel(channelToCreate, 'text')
				.then(chan => msg.channel.send("Alright, I have created the channel <#" + chan.id + ">!"))
			}
			catch(err) {
				console.log(err);
				msg.channel.send("ERR: " + err);
			}
		}
	}
};