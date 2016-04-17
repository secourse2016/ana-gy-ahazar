var db = require('./db');
/*

*/
var oneway = 
var getOneWayFlights = function(callback){
	db.getDatabase().collection('flights').find().to
}


/*
The function is used to insert a feedback into Database.
*/
var insfeedback = function (feed){
	db.getDatabase().collection('feedback').insert(feed);
}