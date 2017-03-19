const Discord = require('discord.js');
const TBA = require('tba-api-storm');
let req = new TBA('FRCDiscord', 'Discord Bot', 1.0);

module.exports = {
	main: function(bot, m) {
		var args = m.content.split(" ")[0];
		var teamNumber = m.content.split(" ")[1];
		console.log(args + ", " + teamNumber);
		if(!isNaN(args)) {
			var team = new Discord.RichEmbed();
			req.getTeam(args).then(d => {
					team.setTitle('*FIRST®* Robotics Competition Team ' + args)
						 .setColor(0x1675DB)
						 .setURL('https://www.thebluealliance.com/team/' + args)
						 .addField('Name', d.nickname, true)
						 .addField('Rookie Year', d.rookie_year, true)
						 .addField('Location', d.location, true)
						 .addField('Website', d.website, true)
						 .addField('Motto', d.motto, true)
					sendEmbed(team)
			}).catch((e) => {console.log(e); m.channel.sendMessage('Team does not exist')});
		} else if(!isNaN(teamNumber)) {
			if (args === "team") {
				var teaminfo = new Discord.RichEmbed();
				req.getTeam(teamNumber).then(d => {
						teaminfo.setTitle('*FIRST®* Robotics Competition Team ' + teamNumber)
							 .setColor(0x1675DB)
							 .setURL('https://www.thebluealliance.com/team/' + teamNumber)
							 .addField('Name', d.nickname, true)
							 .addField('Rookie Year', d.rookie_year, true)
							 .addField('Location', d.location, true)
							 .addField('Website', d.website, true)
							 .addField('Motto', d.motto, true)
						sendEmbed(teaminfo)
				}).catch((e) => {console.log(e); m.channel.sendMessage('Team does not exist')});
			} else if (args === "awards") {
				var awardlist = new Discord.RichEmbed();
				req.getTeamAwardHistory(teamNumber).then(d => {
						awardlist.setTitle('Awards for *FIRST®* Robotics Competition Team ' + teamNumber)
							.setColor(0x1675DB)
							.setURL('https://www.thebluealliance.com/team/' + teamNumber)
						var awards = [""];
						var n = 0;
						for(var i = 0; i < d.length; i++) {
							if((awards[n] + d[i].year + " - " + d[i].name).length >= 1024) {
								n++;
							}
							if(awards[n] != undefined) {
								awards[n] += d[i].year + " - " + d[i].name + "\n";
							}
							else {
								awards[n] = d[i].year + " - " + d[i].name + "\n";
							}
						}
						for(var j = 0; j < awards.length; j++) {
							if(awards[j] != undefined) {
								if(awards.length == 1)
									awardlist.addField("Award List", awards[j])
								else
									awardlist.addField("Award List Page " + (j + 1), awards[j])
							}
							if(awardlist.fields.length == 2 || j == awards.length - 1) {
								awardlist.setColor(0x1675DB)
								sendEmbed(awardlist);
							}
						}
				}).catch((e) => {
					console.log(e.message);
					msg.reply(e);
				});
			} else if (args === "robots") {
				var robots = new Discord.RichEmbed();
				req.getTeamRobotHistory(teamNumber).then(d => {
						robots.setTitle('Robots for *FIRST®* Robotics Competition Team ' + teamNumber)
							.setColor(0x1675DB)
							.setURL('https://www.thebluealliance.com/team/' + teamNumber)
						for(let i in d){
							robots.addField(i, d[i].name);
						}
						sendEmbed(robots);
						team = null;
				}).catch((e) => {
					console.log(e.message);
					m.reply("an error has occurred")
				});
			} else if (args === "events") {
				var evts = new Discord.RichEmbed();
				let year = m.content.split(" ")[2];
				console.log(year);
				if(year == undefined) {
					console.log('switching to 2017');
					year = 2017;
				}
				req.getTeamEvents(teamNumber, year).then(d => {
					evts.setTitle('Events for *FIRST®* Robotics Competition Team ' + teamNumber + ' in ' + year)
						.setColor(0x1675DB)
						.setURL('https://www.thebluealliance.com/team/' + teamNumber)
					for(var i = 0; i < d.length; i++){
						startDate = new Date(d[i].start_date);
						endDate = new Date(d[i].end_date);
						evts.addField(d[i].year + ' ' + d[i].name, d[i].location + '\n' + startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString());
					}
					sendEmbed(evts);
				}).catch((e) => {
					console.log(e.message);
					m.reply("an error has occurred")
				});
			}
		} else {
			if (args === "district") {
				var toSend = new Discord.RichEmbed();
				let subcommand = m.content.split(" ")[1];
				if(subcommand == "list") {
					req.getDistrictList(2017).then(d => {
						toSend.setColor(0x1675DB)
						.setURL('https://www.thebluealliance.com');
						var str = "";
						for(var i = 0; i < d.length; i++){
							str += d[i].name + ", ";
						}
						str = str.substring(0, str.length - 2);
						toSend.addField("District List", str)
						sendEmbed(toSend);
					}).catch((e) => {
						console.log(e.message);
						m.reply("an error has occurred")
					});
				} else if(subcommand == "events") {
					
				} else if(subcommand == "rankings") {
					var district = m.content.split(" ")[2];
					var year = m.content.split(" ")[3];
					var rankings = req.getDistrictRankings(district, year)
					
				} else {
					m.channel.sendMessage("Arguments for district subcommant: list, events, rankings")
				}
			} else {
				m.channel.sendMessage("Please specify an argument! Accepted arguments: team, awards, robots, events, district");
			}
		}
		
		function sendEmbed(embed) {
			m.channel.sendEmbed(embed)
			.then(msg =>  {
				setTimeout(() => {
					msg.delete();
				}, 30000);
			})
		}
	}
};
