module.exports = {
	name: '8ball',
    usage: '<p>8ball',
    permission: 1,
    help: 'Simulates an 8ball.',
	main: function(bot, message) {
		const predict = require('eightball');
		message.reply(predict());
	}
};