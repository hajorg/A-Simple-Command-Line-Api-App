var inquirer 	= require("inquirer");
var Client 		= require('node-rest-client').Client;
var client 		= new Client();
//Example of a valid twitcher
var streamer 	= "OgamingSC2";

function getData (callback){
	var question = [{
		name : 'username',
		type : 'input',
		message: 'Enter a valid twitch username: ',
		validate: function(value) {
			if (value.length) {
				return true;
			}else {
				return 'Please enter a twitch username';
			}
			
		}
	}];
	inquirer.prompt(question).then(callback);
};

function getTwitcher() {
	var username = arguments[0]['username'];
	client.get("https://api.twitch.tv/kraken/streams/"+username+"?client_id=f9b1doaq2gxch1fktp5f76zw2uq8wbu", function (data, response) {
		if (data.stream !== null) {
			console.log("Name: "+data.stream.channel['display_name']);
			console.log("ID: "+data.stream._id);
			console.log("Game: "+data.stream.game);
			console.log("Total Viewers: "+data.stream.viewers);
		} else {
			console.log("Oops! "+username+" is not a valid twitch username");
		}
		
	});
}
getData(getTwitcher);
