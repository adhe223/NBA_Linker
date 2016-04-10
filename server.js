var parser = require('./Parser');
var fileLoad = require('./FileLoad');
var express = require('express');
var request = require('request');
var logger = require('morgan');
var path = require('path');
var $ = require('cheerio');
var app = express();

var gameDict = new Object();

// Log the requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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
				var gamesArr = new Array();
				for (var game in gameDict) {
					var gameObject = new Object();
					gameObject.ID = game;
					gameObject.stream = gameDict[game];
					gamesArr.push(gameObject)
				}
				res.render('main.ejs', {games: gamesArr});
				res.end();
			});
		});
	});
})

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
