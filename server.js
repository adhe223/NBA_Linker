var parser = require('./Parser');
var fileLoad = require('./FileLoad');
var express = require('express');
var request = require('request');
var $ = require('cheerio');
var app = express();

var gameDict = new Object();

app.get('/', function (req, res) {
	//Load the streams file
	fileLoad.loadFileContents(function() {
		//Get the current games for the day. gotHTML will try to retrieve a stream for each game.
		var domain = 'http://www.nba.com/gameline/'
		domain = domain + parser.getDate() + '/'
		request(domain, function(err, message, html) {
			if (err) {
				return console.error(err);
			}

			var parsedHTML = $.load(html);
			parser.loadGames(parsedHTML, gameDict, function() {
				for (var game in gameDict) {
					var stream = game + " " + gameDict[game];
					//This will be populated with each game ID as the key, and the matching stream as the value
					res.write(stream);
				}
				res.end();
			});
		});
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
