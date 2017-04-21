var config = require("../config.json");
const fse = require("fs-extra");

module.exports = {
	name: 'feedback',
    usage: 'feedback',
    permission: 1,
    help: 'Allows the user to provide feedback about the bot',
	main: function(bot, msg) {
		var owner = bot.users.get('171319044715053057');
		owner.send(msg.content);
	}
};
