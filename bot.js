var config = require("./config.json");
const sqlite3 = require('sqlite3').verbose();
var m = new Date().getMonth() + 1;
var y = new Date().getFullYear();
var db = new sqlite3.Database('frclogs-' + m + '-' + y + '.sqlite');
const Discord = require("discord.js");
const fse = require("fs");
const unirest = require('unirest');
const PREFIX = config.prefix;
let bot = new Discord.Client({
	fetchAllMembers: true,
	sync: true,
	disabledEvents: ["TYPING_START", "TYPING_STOP", "ROLE_CREATE", "ROLE_DELETE", "USER_UPDATE"]
});

const chalk = require("chalk");
var guil = chalk.bgBlue;
var chan = chalk.bold.red;
var usr = chalk.bold.green;
var message = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;

let plugins = new Map();

console.log("RoBot is ready! Loading plugins...");
loadPlugins();

bot.on("ready", () => {
	sendServerCount(bot);

	var str = "";
	var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	var seconds = currentTime.getSeconds()
	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;
	str += hours + ":" + minutes + ":" + seconds;
	console.log("Bot Online and Ready! On " + bot.guilds.size + " Servers!");
	
	let games = [`in ${bot.guilds.size} servers`];
	bot.user.setPresence({
		game: {
			name: games[Math.round(Math.random() * (games.length - 1))] + ' | ' + PREFIX + 'help', 
			type: 0
		}
	});
	setInterval(() => {
		bot.user.setPresence({
			game: {
				name: games[Math.round(Math.random() * (games.length - 1))] + ' | ' + PREFIX + 'help', 
				type: 0
			}
		});
	}, 300000);
});

bot.on("message", (msg) => {
	var n = msg.createdAt.toTimeString();
	var str = n.substring(0, n.indexOf(" "));
	
	if (msg.channel.type === "text") {
		if (msg.guild.id != '110373943822540800' && msg.guild.id != '264445053596991498')
			console.log(gray("[" + str + "] ") + guil(msg.guild.name) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + " | " + message(msg.cleanContent));

		if (msg.author.bot) return;

		if (msg.content.startsWith(PREFIX)) {
			var content = msg.content.substring(PREFIX.length, msg.content.length);
			var cmd = content.substring(0, content.indexOf(" ")),
				args = content.substring(content.indexOf(" ") + 1, content.length);
			if (content == 'help' || cmd == 'help') {
				help(msg, cmd, args, content);
			} else {
				command(msg, cmd, args, content);
			}
		}
	} else {
		if (msg.author.bot) return;
			msg.channel.send("This bot cannot be used in DMs!");
	}
});

/*bot.on("guildMemberAdd", (member) => {
	if (member.guild.id != "176186766946992128") {
		var channel = member.guild.channels.find('name', 'logs') || member.guild.channels.find('name', 'member-logs') || member.guild.defaultChannel;
		if (member.id == '171319044715053057')
			channel.send(`**${member} (Developer of RoBot) has joined the server.**`)
		else
			channel.send(`Welcome ${member} to the server!`)
	}
});

bot.on("guildMemberRemove", (member) => {
	if (member.guild.id != "176186766946992128") {
		var channel = member.guild.channels.find('name', 'logs') || member.guild.channels.find('name', 'member-logs') || member.guild.defaultChannel;
		channel.send(`${member.user.username} left the server.`)
	}
});*/

bot.on("guildCreate", (guild) => {
	sendServerCount(bot);
	bot.user.setGame(PREFIX + 'help | ' + bot.guilds.size + ' Servers');
	bot.users.get(config.owner).send("I joined **" + guild.name + "** (" + guild.id + ") with **" + guild.members.size + "** members. It's owner is **" + guild.owner.user.username + "** (" + guild.owner.user.id + "). I am now in " + bot.guilds.size + " guilds.")
});

bot.on("guildDelete", (guild) => {
	sendServerCount(bot);
	bot.user.setGame(PREFIX + 'help | ' + bot.guilds.size + ' Servers');
	bot.users.get(config.owner).send("I left **" + guild.name + "** (" + guild.id + ") with **" + guild.members.size + "** members. It's owner is **" + guild.owner.user.username + "** (" + guild.owner.user.id + "). I am now in " + bot.guilds.size + " guilds.")
});

bot.login(config.token);

function command(msg, cmd, args, content) {
	if (plugins.get(cmd) !== undefined && content.indexOf(" ") !== -1) {
		console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
		msg.content = args;
		plugins.get(cmd).main(bot, msg);
	} else if (plugins.get(content) !== undefined && content.indexOf(" ") < 0) {
		console.log(cmand('[NOARGS] ' + msg.author.username + " executed: " + content));
		plugins.get(content).main(bot, msg);
	} else {
		console.log("ERROR:" + content);
	}
}

function help(msg, cmd, args, content) {
	console.log(cmand(msg.author.username + " executed: help"));
	msg.reply('check your DMs!')
	if (content == 'help') {
		var i = 0;
		var e = new Discord.RichEmbed()
		.setAuthor('RoBot', bot.user.avatarURL)
		.setDescription('Command List')
		.setColor(0x1675DB)
		.setFooter('Requested by ' + msg.author.username)
		.setTimestamp()
		plugins.forEach(function (item, key, mapObj) {
			if (i < 25) {
				i++;
				e.addField(item.name + ' (' + item.usage.replace('<p>', PREFIX) + ')', item.help);
			} else {
				i = 0;
				msg.author.send({"embed": e});
				e = new Discord.RichEmbed()
				.setColor(0x1675DB)
				.setFooter('Requested by ' + msg.author.username)
				.setTimestamp()
				e.addField(item.name + ' (' + item.usage + ')', item.help);
			}
		})
		msg.author.send({"embed": e});
	} else {
		console.log('You specified an argument.');
	}
}

function loadPlugins() {
	console.log(__dirname + "/plugins");
	let files = fse.readdirSync(__dirname + "/plugins", "utf8");
	for (let plugin of files) {
		if (plugin.endsWith(".js"))
			plugins.set(plugin.slice(0, -3), require(__dirname + "/plugins/" + plugin));
		else
			console.log(plugin);
	}
	console.log("Plugins loaded.");
}

function sendServerCount(bot) {
	unirest.post("https://bots.discordlist.net/api")
	.send({"token": config.dlist, "servers": bot.guilds.size})
	.end(function (response) {
		console.log(response.body);
	});

	unirest.post("https://bots.discord.pw/api/bots/" + bot.user.id + "/stats")
	.headers({'Authorization': config.dbotspw, 'Content-Type': 'application/json'})
	.send({"server_count": bot.guilds.size})
	.end(function (response) {
		console.log(response.body);
	});

	unirest.post("https://discordbots.org/api/bots/" + bot.user.id + "/stats")
	.headers({'Authorization': config.dbotsorg, 'Content-Type': 'application/json'})
	.send({"server_count": bot.guilds.size})
	.end(function (response) {
		console.log(response.body);
	});

	console.log("All server counts posted successfully!");
}
