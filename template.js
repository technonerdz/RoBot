module.exports = {
	name: 'command',
    usage: '<p>command',
    permission: 1,
    help: 'An example command.',
	main: function(bot, msg) {
		msg.channel.sendMessage('This is an example command!');
	}
};
