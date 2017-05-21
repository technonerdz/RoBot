module.exports = {
	name: 'invite',
    usage: '<p>invite',
    permission: 1,
    help: 'Gives you the bot\'s invite link',
	main: function(bot, message) {
		msg.channel.send("Add me now at https://discordapp.com/oauth2/authorize?client_id=302555306603446283&scope=bot&permissions=8")
	}
};