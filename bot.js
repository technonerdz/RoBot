var config = require("./config.json");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('frclogs.sqlite');
const Discord = require("discord.js");
const fse = require("fs-extra");
const PREFIX = config.prefix;
let bot = new Discord.Client();

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
    bot.user.setGame("FIRST Steamworks 2017");
});

bot.on("message", (msg) => {
    var n = msg.createdAt.toTimeString();
    var str = n.substring(0, n.indexOf(" "));

    if (msg.channel.type === "text") {
      var day = new Date().getDay();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      db.serialize(function() {
        db.run(`CREATE TABLE IF NOT EXISTS frc_logs_${month}_${day + 1}_${year} (MSGINDEX INTEGER PRIMARY KEY, TIME DATETIME DEFAULT CURRENT_TIMESTAMP, CHANNEL_ID VARCHAR(32) NOT NULL, CHANNEL_NAME VARCHAR(32) NOT NULL, AUTHOR_ID VARCHAR(32) NOT NULL, AUTHOR_NAME VARCHAR(32) NOT NULL, AUTHOR_NICKNAME VARCHAR(32), MESSAGE VARCHAR(2000) NOT NULL)`);
        var stmt = db.prepare(`INSERT INTO frc_logs_${month}_${day + 1}_${year} (CHANNEL_ID, CHANNEL_NAME, AUTHOR_ID, AUTHOR_NAME, AUTHOR_NICKNAME, MESSAGE) VALUES (?, ?, ?, ?, ?, ?)`);
        var channelID = msg.channel.id, channelName = msg.channel.name, authorID = msg.author.id, authorNAME = msg.author.username, authorNICK = msg.member.nickname, message = msg.cleanContent;
        stmt.run(channelID, channelName, authorID, authorNAME, authorNICK, message);
        stmt.finalize();

        /*db.each("SELECT * FROM frc_logs", function(err, row) {
          console.log(row);
        });*/
      });

		  console.log(gray("[" + str + "] ") + server(msg.guild) + " | " + chan(msg.channel.name) + " | " + usr(msg.author.username) + ": " + message(msg.cleanContent));

        if (msg.author.bot) return;

        if (msg.content.startsWith("I have read the rules and regulations") && msg.channel.id === "253661179702935552") {
            bot.channels.get("200090417809719296").sendMessage(msg.author + " has entered the server! They are member number " + msg.guild.members.size);
            msg.member.addRole(msg.guild.roles.find('name', 'Members')).catch(err => {console.error(err)});
            msg.guild.members.get(msg.author.id).setNickname(msg.author.username + " - (SET TEAM#)");
            setTimeout(function() {
                bot.channels.get("200090417809719296").sendMessage(msg.author.username + " Join Nick set to --> ``" + msg.author.username + " - (SET TEAM#)``");
            }, 1000)

            msg.guild.defaultChannel.sendMessage("Welcome " + msg.author + " to the **FIRST Robotics Competition Discord Server!**");
			msg.author.sendMessage("Thank you for reading the rules and regulations. We would like to welcome you to the FIRST Robotics Competition Discord Server! " +
                "Please follow the server rules and have fun! Don't hesitate to ping a member of the moderation team " +
                "if you have any questions! \n\n*Please change your nick with '/nick NAME - TEAM#' to reflect your team number!*");
            msg.guild.channels.get('253661179702935552').fetchMessages({
				limit: 2
			})
			.then(messages => msg.channel.bulkDelete(messages))
			.catch(msg.channel.bulkDelete);
				
			msg.channel.sendMessage("Welcome to the server! Please enter the phrase, which may be found in <#253679529745186816>, to gain access to the server.\n\n@everyone");
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

bot.on("guildMemberAdd", (member) => {
    if (member.guild.id === "176186766946992128") {
        bot.channels.get('200090417809719296').sendMessage(member + " joined the server");

        member.guild.channels.get('253661179702935552').sendMessage("Welcome " + member + " to the FIRST® Robotics Competition server! " +
            "You are currently unable to see the server's main channels. " +
            "To gain access to the rest of the server, please read <#253679529745186816> to find the phrase to enter.");
    }
});

bot.on("guildMemberRemove", (member) => {
    member.guild.defaultChannel.sendMessage(member.user.username + " left the server. RIP " + member.user.username + ".");
    if (member.guild.id === "176186766946992128") {
        bot.channels.get("200090417809719296").sendMessage(member.user.username + " left FIRST Robotics Competition");
    }
});

bot.on("guildBanAdd", (guild, user) => {
    guild.defaultChannel.sendMessage(":hammer: " + user.user.username + " was banned.");
    if (member.guild.id === "176186766946992128") {
        bot.channels.get("200090417809719296").sendMessage(":hammer: " + user.user.username + " was banned.");
    }
});

bot.login(config.token);
