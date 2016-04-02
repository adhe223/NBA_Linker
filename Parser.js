var $ = require('cheerio');
var fs = require('fs');
var request = require('request');

var gameDict = [];

var domain = 'http://www.nba.com/gameline/'
domain = domain + getDate() + '/'
request(domain, gotHTML);

function gotHTML(err, resp, html) {
	if (err) {
		return console.error(err)
	}

	var parsedHTML = $.load(html)
	loadGames(parsedHTML);

	for (var game in gameDict) {
		console.log(game);
	}
}

function loadGames($html) {
	$html("div.nbaPreMnScore").each(function(index) {
		var gameTime = $(this).find("p.nbaPreStatTx").text();
		var awayAbbrev = $(this).find("div.nbaTeamsRow div.nbaModTopTeamAw h5.awayteam").text();
		var homeAbbrev = $(this).find("div.nbaTeamsRow div.nbaModTopTeamHm h5.hometeam").text();
		
		if (awayAbbrev.length > 0 && homeAbbrev.length > 0) {
			var gameIDStr = awayAbbrev + "at" + homeAbbrev + " time: " + gameTime;
			
			if (gameDict.indexOf(gameIDStr) == -1) {
				gameDict[gameIDStr] = gameTime
			}
		}
	});
}

function getDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if (month < 10) {month = "0" + month}
	var day = date.getDate();
	if (day < 10) {day = "0" + day}
	
	return year.toString() + month.toString() + day.toString();
}