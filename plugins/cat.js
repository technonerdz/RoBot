var unirest = require('unirest');

module.exports = {
	name: 'cat',
    usage: '<p>cat',
    permission: 1,
    help: 'Returns a random cat picture.',
	main: function(bot, msg) {
		unirest.get("http://random.cat/meow")
        .end(function (result) {
            msg.channel.sendMessage(result.body.file)
        });
	}
};