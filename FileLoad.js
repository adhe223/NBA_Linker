var fs = require('fs');
var streamFileContents = "";
var teamIdentifierDict = {"ATL":"#ATLANTAHAWKS#","CLE":"#CLEVELANDCAVALIERS#","DAL":"#DALLASMAVERICKS#","DET":"#DETROITPISTONS#","IND":"#INDIANAPACERS#","LAC":"#LACLIPPERS#","MEM":"#MEMPHISGRIZZLIES#","MIA":"#MIAMIHEAT#","MIL":"#MILWAUKEEBUCKS#","MIN":"#MINNESOTATIMBERWOLVES#","OKC":"#OKCTHUNDER#","ORL":"#ORLANDOMAGIC#"}

function loadFileContents(callback) {	
	fs.readFile('TeamStreams.txt', function (err, fileContents) {
		streamFileContents = fileContents.toString();
		callback();
	});
}

function getTeamStream(awayAbbrev, homeAbbrev, callback) {
	//Translate the abbreviations to the file identifiers
	var awayTeam = teamIdentifierDict[awayAbbrev];
	var homeTeam = teamIdentifierDict[homeAbbrev];
	
	loadFileContents(function() {
		var index = streamFileContents.indexOf(awayTeam);
		var stream = "";
		
		if (index != -1) {
			stream = parseStreamFromFile(awayTeam, index);
		}
		
		index = streamFileContents.indexOf(homeTeam);
		if (index != -1) {
			stream = parseStreamFromFile(homeTeam, index);
		}
		
		callback(stream);
	});
}

function parseStreamFromFile(teamName, index) {
	var stream = streamFileContents.substring(index + teamName.length, streamFileContents.indexOf('\n', index));
	return stream;
}

getTeamStream("#OKCTHUNDER#","blduelbl", function(stream) {console.log(stream);});