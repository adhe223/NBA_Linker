var parser = require('./Parser');
var fileLoad = require('./FileLoad');
var express = require('express');
var request = require('request');
var app = express();

app.get('/', function (req, res) {
	//Load the streams file
	fileLoad.loadFileContents(function() {
		//Get the current games for the day. gotHTML will try to retrieve a stream for each game.
		var domain = 'http://www.nba.com/gameline/'
		domain = domain + parser.getDate() + '/'
		request(domain, parser.gotHTML);
	});
	
	res.send('Hello World!');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
