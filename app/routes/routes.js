var flights = require('../flights');

module.exports = function(app) {

	var jwt = require('jsonwebtoken');

	/**
	 * This route returns the master page
	 *
	 */
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

    /*
    This route return all one way  Fligths 
    */
	app.get('/api/flights/search/:origin/:destination/:departureDateTime/:class' , function(req, res){
		var oneWay = {
			"origin": origin,
			"destination": destination,
			"departureDateTime": departureDateTime,
			"class": class
		};
		flights.getOneWayFlights(oneWay);
	});

     /*
     This route insert the feedback of the user into the Database
     */
	app.post('/feedback/:email/:message', function(req , res ){
		var feedback = {
			"email":email,
			"message":message,
		};
		flights.insfeedback(feedback );
	});
};
