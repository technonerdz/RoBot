module.exports = {
	main: function(bot, message) {
		var content = message.content.split(" ").splice(1).join(" ");
		var text = content.split("-");

		message.channel.sendMessage("http://memegen.link/" + text[0] + "/" + text[1].split(" ").join("-") + "/" + text[2].split(" ").join("-") + ".jpg");
	}
};
