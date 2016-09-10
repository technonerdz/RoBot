/*RoBot v2.0
 *September 9, 2016
 *Created by Michael Cao (ASIANBOI)*/

'use strict';

const Discord = require('discord.js');
const fse = require('fs-extra');
const PREFIX = '%'

var fs = require('fs')
fs.readFile('token.txt', 'utf8', function(err, token) {
    if (err) {
        return console.log(err);
    }
    bot.login(token);
});

var chalk = require('chalk');
var server = chalk.bold.red;
var chan = chalk.bold.green;
var message = chalk.yellow;
var usr = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;
let bot = new Discord.Client({
  disableEveryone: true
});

let plugins = new Map();

function loadPlugins() {
	console.log(__dirname + '/plugins');
	let files = fse.readdirSync(__dirname + '/plugins', 'utf8');
	for (let plugin of files) {
		if (plugin.endsWith('.js')) {
			console.log(plugin.slice(0, -3));
			plugins.set(plugin.slice(0, -3), require(__dirname + '/plugins/' + plugin));
			console.log('Map: ' + plugins.has(plugin.slice(0, -3)));
		} else {
			console.log(plugin);
		}
	}
    console.log('Plugins loaded.');
}

bot.on('ready', () => {
	console.log('RoBot is ready! Loading plugins...');
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
	bot.user.setStatus("online", 'FIRST Stronghold 2016');
});

bot.on('message', (msg) => {
	var n = msg.timestamp.toTimeString();
	var str = n.substring(0, n.indexOf(' '));
		
	if(msg.channel.type === "dm" || msg.channel.type === "group") {
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.author.username) + " : " + message(msg.content));
		return;
	}
	
	if(msg.channel.type === "text") {
		if (msg.guild.id != "110373943822540800" && msg.guild.id != "185858769895424001" && msg.channel.id != "221664440750309377") {
			console.log(gray("[" + str + "] ") + server(msg.guild.name) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.content));
		}
		
	if (msg.author.bot) return;
	
	if (msg.content.startsWith(PREFIX)) {
		let content = msg.content.split(PREFIX)[1];
		let cmd = content.substring(0, content.indexOf(' ')),
			args = content.substring(content.indexOf(' ') + 1, content.length);
		if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
			console.log(cmand(msg.author.username + " executed: " + cmd + " " + args));
			msg.content = args;
			plugins.get(cmd).main(bot, msg);
		} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
			console.log(cmand(msg.author.username + " executed: " + content));
			plugins.get(content).main(bot, msg);
		} else {
			console.log('ERROR:' + content);
		}
	}
	}
});

bot.on('guildMemberAdd', (guild, user) => {
	var logChannel = bot.channels.get("200090417809719296");
	if(guild.id === "176186766946992128"){
		guild.defaultChannel.sendMessage("Hello " + user.user + " and welcome to the **FIRST Robotics Competition Discord Server** - " + 
												"a place for you to talk to fellow FRC students and enthusiasts about more or less anything! " + 
												"Please pay attention to the rules posted in #rules and have fun! Don't hesitate to ping a mod or an admin " + 
												"if you have any questions! `(Please change your nick with '/nick (name) - (team #)' to reflect your team number!)`");
		logChannel.sendMessage(user.user.username + " joined FIRST Robotics Competition");
		var username = user.user.username;
		var nickee = guild.members.find('id', user.id);
		nickee.setNickname(username + " - (SET TEAM#)");
		setTimeout(function() {
            logChannel.sendMessage(username + " Join Nick set to --> ``" + user.username + " - (SET TEAM#)``");
        }, 1000)
	}
});

bot.on('guildMemberRemove', (guild, user) => {
	if(guild.id === "176186766946992128"){
		guild.defaultChannel.sendMessage(user.user.username + " left the server. RIP " + user.user.username + ".");
		var logChannel = bot.channels.get("200090417809719296");
		logChannel.sendMessage(user.user.username + " left FIRST Robotics Competition");
	}
});

bot.on('guildBanAdd', (guild, user) => {
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