var fs = require('fs');
var fileLoad = require('./FileLoad');
var request = require('request');
var $ = require('cheerio');

module.exports = {
	loadGames: function($html, gameDict, callback) {
		$html("div.nbaPreMnScore").each(function(index) {
			var gameTime = $(this).find("p.nbaPreStatTx").text();
			var awayAbbrev = $(this).find("div.nbaTeamsRow div.nbaModTopTeamAw h5.awayteam").text();
			var homeAbbrev = $(this).find("div.nbaTeamsRow div.nbaModTopTeamHm h5.hometeam").text();

			if (awayAbbrev.length > 0 && homeAbbrev.length > 0) {
				var gameIDStr = awayAbbrev + "at" + homeAbbrev + "time" + gameTime

				if (gameDict[gameIDStr] === undefined) {
					var stream = fileLoad.getTeamStream(awayAbbrev, homeAbbrev);
					if (stream.length > 0) {
						gameDict[gameIDStr] = stream;
					}
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