'use strict';

const Discord = require('discord.js');
const fse = require('fs-extra');
const PREFIX = '%'

var fs = require('fs')
fs.readFile('token.txt', 'utf8', function(err, token) {
    if (err) {
        return console.log(err);
    }
    bot.loginWithToken(token);
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

bot.on('ready', function() {
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
    console.log("Bot Online and Ready! On " + bot.servers.length + " Servers!");
    bot.sendMessage("214876995375464448", ":stopwatch: ``" + str + "`` :mega: RoBot is online and ready! :white_check_mark:");
    bot.setPlayingGame("FIRST Stronghold 2016")
});

bot.on('message', function(msg) {
	
	
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
	
	try {
        console.log(gray("[" + str + "] ") + server(msg.server) + " | " + chan(msg.channel.name) + " | " + usr(msg.sender.username) + ": " + message(msg.cleanContent));
    } catch (err) {
        console.log(gray("[" + str + "]") + server(" [PM] ") + usr(msg.sender.name) + " : " + message(msg.cleanContent));
    }
	
	if (msg.content.startsWith(PREFIX)) {
		let content = msg.content.split(PREFIX)[1];
		let cmd = content.substring(0, content.indexOf(' ')),
			args = content.substring(content.indexOf(' ') + 1, content.length);
		if (plugins.get(cmd) !== undefined && content.indexOf(' ') !== -1) {
			console.log(cmand(msg.sender.username + " executed: " + cmd));
			plugins.get(cmd).main(bot, msg);
		} else if (plugins.get(content) !== undefined && content.indexOf(' ') < 0) {
			console.log(cmand(msg.sender.username + " executed: " + content));
			plugins.get(content).main(bot, msg);
		} else {
			console.log('ERROR:' + content);
		}
	}
});

bot.on('serverNewMember', function(server, user) {
	if(server.id === "176186766946992128"){
		bot.sendMessage(server.defaultChannel, "Hello " + user + " and welcome to the **FIRST Robotics Competition Discord Server** - " + 
												"a place for you to talk to fellow FRC students and enthusiasts about more or less anything! " + 
												"Please pay attention to the rules posted in #rules and have fun! Don't hesitate to ping a mod or an admin " + 
												"if you have any questions! `(Please change your nick with '/nick (name) - (team #)' to reflect your team number!)`");
		bot.sendMessage("200090417809719296", user + " joined FIRST Robotics Competition");
		var username = user.username;
		bot.setNickname(server, username + " - (SET TEAM#)", user);
		setTimeout(function() {
            bot.sendMessage("200090417809719296", username + " Join Nick set to --> ``" + user.username + " - (SET TEAM#)``");
        }, 1000)
	}
});

bot.on('serverMemberRemoved', function(server, user) {
	if(server.id === "176186766946992128"){
		bot.sendMessage(server.defaultChannel, user.username + " left the server. RIP " + user.username + ".");
		bot.sendMessage("200090417809719296", user.username + " left FIRST Robotics Competition");
	}
});

bot.on('userBanned', function(server, user) {
    if (server.id === "176186766946992128") {
        bot.sendMessage(server.defaultChannel, ":hammer: " + user.username + " was banned.");
    }
});

bot.on("messageDeleted", function(message) {
    try {
        console.log(server(msg.sender.username + "'s message was deleted!\n Old message: " + msg.content));
    } catch (err) {
        console.log(server("ERR: MESSAGE NOT ARCHIVED"));
    }
});

bot.on("messageUpdated", function(message1, message2) {
    if (server.id === "176186766946992128") {
        console.log(server(message1.sender.username + "'s message was edited!\n Old message: " + message1.content));
    }
});