module.exports = {
	main: function(bot, message) {
		var cmds = require('./commands.json');
		
		var PREFIX = '%c ';
		
		switch (message.content) {
			case (PREFIX) + "consolegaming":
				bot.sendMessage(message, cmds.consolegaming);
				break;
			case (PREFIX) + "boxcutters":
				bot.sendMessage(message, cmds.boxcutters);
				break;
			case (PREFIX) + "datboi":
				bot.sendMessage(message, cmds.datboi);
				break;
			case (PREFIX) + "doktor":
				bot.sendMessage(message, cmds.doktor);
				break;
			case (PREFIX) + "english":
				bot.sendMessage(message, cmds.english);
				break;
			case (PREFIX) + "fitnessgram":
				bot.sendMessage(message, cmds.fitnessgram);
				break;
			case (PREFIX) + "goodshit":
				bot.sendMessage(message, cmds.goodshit);
				break;
			case (PREFIX) + "umso":
				bot.sendMessage(message, cmds.umso);
				break;
			case (PREFIX) + "pcmasterrace":
				bot.sendMessage(message, cmds.pcmasterrace);
				break;
			case (PREFIX) + "wtf":
				bot.sendMessage(message, cmds.wtf);
				break;
			case (PREFIX) + "wtf2":
				bot.sendMessage(message, cmds.wtf2);
				break;
			case (PREFIX) + "wtf3":
				bot.sendMessage(message, cmds.wtf3);
				break;
			case (PREFIX) + "poke":
				bot.sendMessage(message, cmds.poke);
				break;
			case (PREFIX) + "tsimfd":
				bot.sendMessage(message, cmds.tsimfd);
				break;
			case (PREFIX) + "watergame":
				bot.sendMessage(message, cmds.watergame);
				break;
			case (PREFIX) + "aasher":
				bot.sendMessage(message, cmds.aasher);
				break;
			case (PREFIX) + "2017game":
				bot.sendMessage(message, cmds.spaghettigame);
				break;
		}
	}
};