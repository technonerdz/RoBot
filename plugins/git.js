module.exports = {
	name: 'git',
    usage: '<p>git',
    permission: 1,
    help: 'Returns the bot\'s GitHub repository.',
	main: function(bot, message) {
		message.reply("Check out my GitHub at https://github.com/FRCDiscord/RoBot");
	}
};
