module.exports = {
	main: function(bot, message) {
		var cmds = require("./commands.json");

		switch (message.content) {
			case "consolegaming":
				message.channel.sendMessage(cmds.consolegaming);
				break;
			case "boxcutters":
				message.channel.sendMessage(cmds.boxcutters);
				break;
			case "datboi":
				message.channel.sendMessage(cmds.datboi);
				break;
			case "doktor":
				message.channel.sendMessage(cmds.doktor);
				break;
			case "english":
				message.channel.sendMessage(cmds.english);
				break;
			case "fitnessgram":
				message.channel.sendMessage(cmds.fitnessgram);
				break;
			case "goodshit":
				message.channel.sendMessage(cmds.goodshit);
				break;
			case "umso":
				message.channel.sendMessage(cmds.umso);
				break;
			case "pcmasterrace":
				message.channel.sendMessage(cmds.pcmasterrace);
				break;
			case "wtf":
				message.channel.sendMessage(cmds.wtf);
				break;
			case "wtf2":
				message.channel.sendMessage(cmds.wtf2);
				break;
			case "wtf3":
				message.channel.sendMessage(cmds.wtf3);
				break;
			case "poke":
				message.channel.sendMessage(cmds.poke);
				break;
			case "tsimfd":
				message.channel.sendMessage(cmds.tsimfd);
				break;
			case "watergame":
				message.channel.sendMessage(cmds.watergame);
				break;
			case "aasher":
				message.channel.sendMessage(cmds.aasher);
				break;
			case "spaghettigame":
				message.channel.sendMessage(cmds.spaghettigame);
				break;
			case "spacegame":
				message.channel.sendMessage(cmds.spacegame);
				break;
		}
	}
};
