var config = require("../config.json");

module.exports = {
	name: 'help',
    usage: 'help',
    permission: 1,
    help: 'Gives the user a list of the bot\'s commands.',
	main: function(bot, message) {
		let files = fse.readdirSync(__dirname, "utf8");
		for (let plugin of files) {
			if (plugin.endsWith(".js"))
				plugins.set(plugin.slice(0, -3), require(__dirname + plugin));
		}
		var help = "";
	}
};
