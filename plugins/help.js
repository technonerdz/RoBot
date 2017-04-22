var config = require("../config.json");
const fse = require("fs-extra");

module.exports = {
	name: 'help',
    usage: 'help',
    permission: 1,
    help: 'Gives the user a list of the bot\'s commands.',
	main: function(bot, msg) {
		let plugins = new Map();
		let files = fse.readdirSync(__dirname, "utf8");
		for (let plugin of files) {
			if (plugin.endsWith(".js"))
				plugins.set(plugin.slice(0, -3), require(__dirname + "/" + plugin));
		}
		
		for(var key in plugins) {
			msg.channel.sendMessage(plugins.get(key).help);
		}
	}
};
