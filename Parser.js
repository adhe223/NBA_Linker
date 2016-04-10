var $ = require('cheerio');
var fs = require('fs');
var fileLoad = require('./FileLoad');
var request = require('request');

var gameDict = [];

module.exports = {
	gotHTML: function(err, resp) {
		if (err) {
			return console.error(err)
		}

		var parsedHTML = $.load(resp.body);
		module.exports.loadGames(parsedHTML, function() {
			for (var game in gameDict) {
				var stream = "blabla";
				//This will be populated with each game ID as the key, and the matching stream as the value
				resp.write(stream);
			}
			resp.end();
		});
	},

	loadGames: function($html, callback) {
		$html("div.nbaPreMnScore").each(function(index) {
			var gameTime = $(this).find("p.nbaPreStatTx").text();
			var awayAbbrev = $(this).find("div.nbaTeamsRow div.nbaModTopTeamAw h5.awayteam").text();
			var homeAbbrev = $(this).find("div.nbaTeamsRow div.nbaModTopTeamHm h5.hometeam").text();
			
			if (awayAbbrev.length > 0 && homeAbbrev.length > 0) {
				var gameIDStr = awayAbbrev + "at" + homeAbbrev
				
				if (!(gameIDStr in gameDict)) {
					gameDict[gameIDStr] = fileLoad.getTeamStream(awayAbbrev, homeAbbrev);
				}
			}
		});
		
		callback();
	},
	
	getDate: function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (month < 10) {month = "0" + month}
		var day = date.getDate();
		if (day < 10) {day = "0" + day}
		
		return year.toString() + month.toString() + day.toString();
	}
}