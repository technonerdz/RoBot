/*RoBot v2.0
 *September 9, 2016
 *Created by Michael Cao (ASIANBOI)*/

"use strict";

var config = require("./config.json");
const Discord = require("discord.js");
const fse = require("fs-extra");
const PREFIX = config.prefix;
let bot = new Discord.Client({
  disableEveryone: true
});

bot.login(config.token);

var TelegramBot = require("node-telegram-bot-api");
var telebot = telebot = new TelegramBot(config.ttoken, {polling: true});

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
			console.log(plugin.slice(0, -3) + ": " + plugins.has(plugin.slice(0, -3)));
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
	const ASIANBOI = bot.users.get("171319044715053057");
    ASIANBOI.sendMessage(":stopwatch: ``" + str + "`` :mega: RoBot is online and ready! :white_check_mark:");
	bot.user.setStatus("online", "FIRST Stronghold 2016");

	var teleChannel = bot.channels.get("227072177495736321");
	teleChannel.sendMessage("**THE CONNECTION HAS BEEN OPENED**");
	telebot.sendMessage(-1001080706960, "THE CONNECTION HAS BEEN OPENED");
});

bot.on("message", (msg) => {
	var n = msg.timestamp.toTimeString();
	var str = n.substring(0, n.indexOf(" "));

	if(msg.channel.type === "dm" || msg.channel.type === "group") {
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
		return;
	}

	if(msg.channel.type === "text") {
		if (msg.guild.id != "110373943822540800" && msg.guild.id != "185858769895424001" && msg.channel.id != "221664440750309377") {
			console.log(gray("[" + str + "] ") + server(msg.guild.name) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.content));
		}

		if (msg.author.bot) return;

		//Takes message such as ">Hello" and sends it to Telegram
		if (msg.content.startsWith("t!") || msg.content.startsWith("T!") || msg.channel.id == "227072177495736321") {
			var args = msg.cleanContent;
			if (msg.content.startsWith("t!")) {
				args = args.substring(2, str.length);
			}
			args = args.trim();
			var member = msg.guild.members.find("id", msg.author.id);
			if(member.nickname != null)
				telebot.sendMessage(-1001080706960, member.nickname + ": " + args);
			else
				telebot.sendMessage(-1001080706960, msg.author.username + ": " + args);
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
	var logChannel = bot.channels.get("200090417809719296");
	if(guild.id === "176186766946992128"){
		guild.defaultChannel.sendMessage("Hello " + user.user + " and welcome to the **FIRST Robotics Competition Discord Server** - " + 
                                                "a place for you to talk to fellow FRC students and enthusiasts about more or less anything! " + 
                                                "Please pay attention to the rules posted in #rules-info and have fun! Don't hesitate to ping a mod or an admin " + 
                                                "if you have any questions! \n\n**Please change your nick with '/nick NAME - TEAM#' to reflect your team number!**");
		logChannel.sendMessage(user.user.username + " joined FIRST Robotics Competition");
		var username = user.user.username;
		var nickee = guild.members.find("id", user.id);
		nickee.setNickname(username + " - (SET TEAM#)");
		setTimeout(function() {
            logChannel.sendMessage(username + " Join Nick set to --> ``" + user.user.username + " - (SET TEAM#)``");
        }, 1000)
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

bot.on("messageDelete", (message) => {
    try {
        console.log(server(msg.author.username + "'s message was deleted!\n Old message: " + msg.content));
    } catch (err) {
        console.log(server("ERR: MESSAGE NOT ARCHIVED"));
    }
});

bot.on("messageUpdate", (message1, message2) => {
    if (message1.guild.id === "176186766946992128") {
        console.log(server(message1.author.username + "'s message was edited!\n Old message: " + message1.content));
    }
});

telebot.on("message", function (msg) {
		if(msg.from.last_name != undefined)
			var sender = msg.from.first_name + " " + msg.from.last_name;
		else
			var sender = msg.from.first_name;
		var content = msg.text;
		if(sender != "RoBot") {
			var text = content;
			text = text.replace("@everyone", "").replace("@here", "");
			var logChannel = bot.channels.get("227072177495736321");
			logChannel.sendMessage("`[TELEGRAM]` " + sender + ": " + text);
		}
});

telebot.onText(/\/help/, function (msg, match) {
	var fromId = msg.from.id;
	telebot.sendMessage(fromId, "Just do \">message\" to send a message to the Discord!");
});
