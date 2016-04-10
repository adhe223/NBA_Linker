var parser = require('./Parser');
var fileLoad = require('./FileLoad');
var express = require('express');
var request = require('request');
var logger = require('morgan');
var path = require('path');
var $ = require('cheerio');
var app = express();
var port = process.env.PORT || 3000;

var gameDict = new Object();

// Log the requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

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
					var teams = game.split('at');
					gameObject.away = teams[0];
					gameObject.home = teams[1];
					gameObject.ID = game;
					gameObject.stream = gameDict[game].trim();
					gamesArr.push(gameObject)
				}
				res.render('main.ejs', {games: gamesArr});
				res.end();
			});
		});
	});
})

app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
