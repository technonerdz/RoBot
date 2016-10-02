var unirest = require('unirest');

module.exports = {
	main: function(bot, message) {
		const isCommander = ["171319044715053057", "180094452860321793"];
		if (isCommander.indexOf(message.author.id) > -1){
			unirest.post('https://canary.discordapp.com/api/webhooks/232178936111562760/UtZ9hySj3JhZpkbReZ6hiP1kVqtTjVmVlYSmPS5eKmucyQU-G9haFvbvgAWywHoQyQ26')
                .send({"username": "Server Overlords", "content": message.content})
                .end(function (response) {
                    console.log(response.body);
                });
			message.delete();
		}
	}
};

/*{
    "username": "This is MAGIC",
    "text": "I don't know what you think this will achieve but I know it will be GREATNESS",
    "attachments": [{
            "title": "Did something move?",
            "pretext": "If they don't move I can't see them.",
            "author_name": "Evelyne Lachance",
            "author_link": "http://www.youareanidiot.org/",
            "author_icon": "https://cdn.discordapp.com/emojis/214143468962840588.png",
            "color": "#56f442",
            "fields": [{
                "title": "What happened?",
                "value": "A nice formatted message",
                "short": true
            }, {
                "title": "How?",
                "value": "Webhooks",
                "short": true
            }],
            "footer": "Did something move?",
            "image_url": "http://i.imgur.com/njL3Jy0.png",
            "footer_icon": "https://cdn.discordapp.com/emojis/214143468962840588.png",
            "ts": 123456789
        }]
}*/