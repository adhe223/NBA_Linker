var fs = require('fs');
var streamFileContents = "";
var teamIdentifierDict = {"ATL":"#ATLANTAHAWKS#","BOS":"#BOSTONCELTICS#","BKN":"#BROOKLYNNETS#","CHA":"#CHARLOTTEHORNETS#","CHI":"#CHICAGOBULLS#","CLE":"#CLEVELANDCAVALIERS#","DAL":"#DALLASMAVERICKS#","DEN":"#DENVERNUGGETS#","DET":"#DETROITPISTONS#","GSW":"#GSWARRIORS#","HOU":"#HOUSTONROCKETS#","IND":"#INDIANAPACERS#","LAC":"#LACLIPPERS#","LAL":"#LALAKERS#","MEM":"#MEMPHISGRIZZLIES#","MIA":"#MIAMIHEAT#","MIL":"#MILWAUKEEBUCKS#","MIN":"#MINNESOTATIMBERWOLVES#","NOP":"#NEWORLEANSPELICANS#","NYK":"#NYKNICKS#","OKC":"#OKCTHUNDER#","ORL":"#ORLANDOMAGIC#","PHI":"#PHILADELPHIA76ERS#","PHX":"#PHOENIXSUNS#","POR":"#PORTLANDTRAILBLAZERS#","SAC":"#SACRAMENTOKINGS#","SAS":"#SANANTONIOSPURS#","TOR":"#TORONTORAPTORS#","UTA":"#UTAHJAZZ#","WAS":"#WASHINGTONWIZARDS#"};

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
			return stream;
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