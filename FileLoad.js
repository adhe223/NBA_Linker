var fs = require('fs');
var streamFileContents = "";
var teamIdentifierDict = {"ATL":"#ATLANTAHAWKS#","CLE":"#CLEVELANDCAVALIERS#","DAL":"#DALLASMAVERICKS#","DET":"#DETROITPISTONS#","IND":"#INDIANAPACERS#","LAC":"#LACLIPPERS#","MEM":"#MEMPHISGRIZZLIES#","MIA":"#MIAMIHEAT#","MIL":"#MILWAUKEEBUCKS#","MIN":"#MINNESOTATIMBERWOLVES#","OKC":"#OKCTHUNDER#","ORL":"#ORLANDOMAGIC#"};

module.exports = {
	loadFileContents: function(callback) {	
		fs.readFile('TeamStreams.txt', function (err, fileContents) {
			streamFileContents = fileContents.toString();
			callback();
		});
	},

	getTeamStream: function(awayAbbrev, homeAbbrev) {
		//Translate the abbreviations to the file identifiers
		var awayTeam = teamIdentifierDict[awayAbbrev];
		var homeTeam = teamIdentifierDict[homeAbbrev];
		
		var index = streamFileContents.indexOf(awayTeam);
		var stream = "";
		
		if (index != -1) {
			stream = parseStreamFromFile(awayTeam, index);
		}
		
		index = streamFileContents.indexOf(homeTeam);
		if (index != -1) {
			stream = parseStreamFromFile(homeTeam, index);
		}
		
		return stream;
	}
}

function parseStreamFromFile(teamName, index) {
	var stream = streamFileContents.substring(index + teamName.length, streamFileContents.indexOf('\n', index));
	return stream;
}