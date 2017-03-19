module.exports = {
	main: function(bot, msg) {
		var time = msg.content;
		console.log("\`" + time + "\`")
		
		if(!isNaN(time) && msg.member.hasPermission('MANAGE_MESSAGES')) {
			msg.channel.overwritePermissions(msg.guild.roles.get('246469964574228481'), {SEND_MESSAGES: false})
			.then(
				msg.channel.sendMessage(`**This channel has been timed out for ${time} seconds by ${msg.author}.**`)
				.then(msg => {
					setTimeout(() => {
						msg.edit("**The timeout period has elapsed.**");
						msg.channel.overwritePermissions(msg.guild.roles.get('246469964574228481'), {SEND_MESSAGES: true});
					}, time * 1000);
				})
			);
		}
	}
};

