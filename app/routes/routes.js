var flights = require('../flights');
var db = require('../db');

module.exports = function(app) {

	var jwt = require('jsonwebtoken');

	/**
	* This route returns the master page
	*
	*/
	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});


	app.post('/api/flights/reservation/:title/:first_name/:last_name/:nationality/:date_of_birth/:ticket_type/:ticket_class/:passport_number/:issue_date/:expiration_date/:meal_preference/:special_needs/:payment_id/:contact_id/:emergency_contact_id/:flight_id/:', function(req, res) {

		var reservation = 	{
      "title": req.params.title,
      "first_name": req.params.first_name,
      "last_name": req.params.last_name,
      "nationality": req.params.nationality,
      "date_of_birth": req.params.date_of_birth,
      "ticket_type": req.params.ticket_type,
      "ticket_class": req.params.ticket_class,
      "passport_number": req.params.passport_number,
      "expiration_date": req.params.expiration_date,
      "meal_preference": req.params.meal_preference,
      "special_needs": req.params.special_needs,
      "payment_id": req.params.payment_id,
      "contact_id": req.params.contact_id,
      "emergency_contact_id": req.params.emergency_contact_id,
      "flight_id": req.params.flight_id
         };

      flights.Reserve(reservation);
		
	});


	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:classs', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        // return this exact format
          var  outGoing = {    	
         "origin":        req.params.origin,
         "destination":   req.params.destination,
         "departureDateTime": parseInt(req.params.departingDate),
         "class":         req.params.classs
         };

          var  inComing = {    	
         "origin":        req.params.destination,
         "destination":   req.params.origin,
         "departureDateTime": parseInt(req.params.returningDate),
         "class":         req.params.classs
         };
         
          
          
          var result = {
           outGoing : {} ,
           inComing : {}
           } ;
        flights.getOneWayFlights(outGoing,function(err ,data ){
        	if(err) throw err ;
        	else{
              result.outGoing = data ;
             
              flights.getOneWayFlights(inComing,function(err ,d){
              	if(err) throw err ;
                result.inComing = d ;
                res.json(result) ;
             });
        	}
        	

        });

         
      
    }); 

    /**
	 * This route deletes the database
	 *
	 */
	app.get('/db/delete', function(req, res) {
    db.clear(function(){
    	res.send("deleted successfully");
       });
   });
     /**
	 * This route gets a specific reservation information
	 *
	 */
	 app.get('/api/flights/reservation/:bookingReference', function(req, res) {
		 flights.getReservation(function(err, data) {
			 res.json(data);
		 }, bookingReference);
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
		flights.seed(function(err,seeded){
			if(err){
				throw err;
			}
			res.send("seeded sucessful");
		});
	});

	/**
	* This route validates the promotion_code
	*
	*/
	app.get('/api/validatepromo/:promoCode',function(req,res) {
		db.getDatabase().collection('promotionCodes').findOne(promoCode, function(err, result) {
			if (err) {
				throw err;
			}
			if (result) {
				var valid =	result.valid;
				if(valid){
					var discount = result.discount
					db.getDatabase().collection('promotionCodes').deleteOne(promoCode,  function(err, results) {
						if(err){
							throw err;
						}
						res.send(discount+"");
					});

				}else{
					res.send(0.0+"");
				}
			} else {
				res.send(0.0+"");
			}
		});
	});

};
