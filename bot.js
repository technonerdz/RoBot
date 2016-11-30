var config = require("./config.json");
const Discord = require("discord.js");
const fse = require("fs-extra");
const PREFIX = config.prefix;
let bot = new Discord.Client({
  disableEveryone: true
});

var chalk = require("chalk");
var server = chalk.bold.red;
var chan = chalk.bold.green;
var message = chalk.yellow;
var usr = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;

let plugins = new Map();

function loadPlugins() {
	console.log(__dirname + "/plugins");
	let files = fse.readdirSync(__dirname + "/plugins", "utf8");
	for (let plugin of files) {
		if (plugin.endsWith(".js")) {
			plugins.set(plugin.slice(0, -3), require(__dirname + "/plugins/" + plugin));
		} else {
			console.log(plugin);
		}
	}
    console.log("Plugins loaded.");
}

bot.on("ready", () => {
	console.log("RoBot is ready! Loading plugins...");
	loadPlugins();

	var str = "";
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds;
    console.log("Bot Online and Ready! On " + bot.guilds.size + " Servers!");
	const owner = bot.users.get(config.owner);
    owner.sendMessage(":stopwatch: ``" + str + "`` :mega: RoBot is online and ready! :white_check_mark:");
	bot.user.setStatus("online", "FIRST Steamworks 2017");
});

bot.on("message", (msg) => {
	var n = msg.createdAt.toTimeString();
	var str = n.substring(0, n.indexOf(" "));

	if(msg.channel.type === "text") {
			
		console.log(gray("[" + str + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.cleanContent));

		if (msg.author.bot) return;

		if(msg.content == "I have read the rules and regulations." && msg.channel.id == "200090417809719296") {
			var logChannel = bot.channels.get("200090417809719296");
			var role = msg.guild.roles.get('name', 'Members');
			logChannel.sendMessage(msg.author + " has read the rules and verified themselves!");
			msg.author.addRole(role).catch(console.error);
			var nickee = guild.members.find(msg.author.user);
			nickee.setNickname(msg.author.user.username + " - (SET TEAM#)");
			setTimeout(function() {
				logChannel.sendMessage(username + " Join Nick set to --> ``" + user.user.username + " - (SET TEAM#)``");
			}, 1000)
			
			guild.defaultChannel.sendMessage("Welcome " + user.user + " to the **FIRST Robotics Competition Discord Server** - " + 
                                                "a place for you to talk to fellow FRC members about more or less anything! " + 
                                                "Please follow the rules posted in #rules-info and have fun! Don't hesitate to ping a mod or an admin " + 
                                                "if you have any questions! \n\n**Change your nick with '/nick NAME - TEAM#' to reflect your team number!**");
			message.guild.channels.find('id', '253661179702935552').fetchMessages({limit: num})
					.then(messages => message.channel.bulkDelete(messages))
					.catch(message.channel.bulkDelete);
		}

		if (msg.content.startsWith(PREFIX)) {
			let content = msg.content.split(PREFIX)[1];
			let cmd = content.substring(0, content.indexOf(" ")),
				args = content.substring(content.indexOf(" ") + 1, content.length);
			if (plugins.get(cmd) !== undefined && content.indexOf(" ") !== -1) {
				console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
				msg.content = args;
				plugins.get(cmd).main(bot, msg);
			} else if (plugins.get(content) !== undefined && content.indexOf(" ") < 0) {
				console.log(cmand(msg.author.username + " executed: " + content));
				plugins.get(content).main(bot, msg);
			} else {
				console.log("ERROR:" + content);
			}
		}
	}
});

bot.on("guildMemberAdd", (guild, user) => {
	var logChannel = bot.channels.get('id', '200090417809719296');
	if(guild.id === "176186766946992128"){
		logChannel.sendMessage(user.user.username + " joined the server");
		
		guild.channels.find('id', '253661179702935552').sendMessage("Welcome " + user + " to the FIRST® Robotics Competition server! " + 
		"You are currently unable to see the server's main channels. " +
		"To gain access to the rest of the server, please read #rules-info to find the phrase to enter.");
	}
});

bot.on("guildMemberRemove", (guild, user) => {
	if(guild.id === "176186766946992128"){
		guild.defaultChannel.sendMessage(user.user.username + " left the server. RIP " + user.user.username + ".");
		var logChannel = bot.channels.get("200090417809719296");
		logChannel.sendMessage(user.user.username + " left FIRST Robotics Competition");
	}
});

bot.on("guildBanAdd", (guild, user) => {
	guild.defaultChannel.sendMessage(":hammer: " + user.user.username + " was banned.");
	var logChannel = bot.channels.get("200090417809719296");
		logChannel.sendMessage(":hammer: " + user.user.username + " was banned.");
});

bot.login(config.token);
