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

	app.post('/api/flights/reservation/:title/:first_name/:last_name/:nationality/:date_of_birth/:ticket_type/:ticket_class/:passport_number/:issue_date/:expiration_date/:meal_preference/:special_needs/:payment_id/:contact_id/:emergency_contact_id/:flight_id/:', function(req, res) {

		var reservation = 	{
      "title": title,
      "first_name": first_name,
      "last_name": last_name,
      "nationality": nationality,
      "date_of_birth": date_of_birth,
      "ticket_type": ticket_type,
      "ticket_class": ticket_class,
      "passport_number": passport_number,
      "expiration_date": expiration_date,
      "meal_preference": meal_preference,
      "special_needs": special_needs,
      "payment_id": payment_id,
      "contact_id": contact_id,
      "emergency_contact_id": emergency_contact_id,
      "flight_id": flight_id,
         };

      flights.Reserve(reservation);
		
	});


	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:classs', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        // return this exact format
          var  round_info = {    	
         "origin": origin,
         "destination": destination,
         "departingDate": departingDate,
         "returningDate": returningDate,
         "class": classs,
         };

         
      
    });    

};
