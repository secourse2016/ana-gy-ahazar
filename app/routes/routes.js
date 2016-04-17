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
			"origin": req.params.origin,
			"destination": req.params.destination,
			"departureDateTime": req.params.departureDateTime,
			"class": req.params.classs
		};
		flights.getOneWayFlights(oneWay , function(err ,data){
			if (err){
				throw err;
			}else{
				res.json(data);
			}
		});
	});

     /*
     This route insert the feedback of the user into the Database
     */
	app.post('/feedback', function( req , res ){
		var feedback = req.body;
		flights.addFeedback(feedback , function(err){
					
			if (err){
			 res.send("error") ;	
			}else{
            res.send("success");
			}
		}	);
	});
	/**
	 * This route returns a json object with all the countries.
	 *
	 */
	app.get('/api/countries', function(req, res) {
		flights.getCountries(function(err, data) {
			res.json(data);
		});
	});

	/**
	 * This route returns a json objects with all the airports.
	 *
	 */
	 app.get('/api/airports', function(req, res) {
		 flights.getAirports(function(err, data) {
			 res.json(data);
		 });
	 });

	 /**
	 * This route seeds the database
	 *
	 */
	app.get('/db/seed', function(req, res) {
		flights.seed(function(){
			res.send("seeded sucessful");
		});
	 });

	 /**
	  * This route validates the promotion_code
	  *
	  */
	app.get('/api/validatepromo/:promoCode',function(req,res) {

	});
};
