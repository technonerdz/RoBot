var lol = require("../plasmalol.json")

module.exports = {
	main: function(bot, msg) {
    delete require.cache[require.resolve('../plasmalol.json')];
    var lol = require("../plasmalol.json")
    msg.reply(`TPG has said 'lol' **${lol[0]}** times since March 28, 2017!`)
	}
};
