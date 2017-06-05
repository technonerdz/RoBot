
module.exports = {
	name: 'ftcroot',
    usage: '<p>ftcroot <team number>',
    permission: 1,
    help: 'Returns an ftcroot link for a given FTC team\'s number',
	main: function(bot, message) {
		message.channel.sendMessage('http://www.ftcroot.com/teams/' + message.content);
	}
};
