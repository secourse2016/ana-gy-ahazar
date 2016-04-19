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
		 }, req.params.bookingReference);
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
		var promoCode = req.params.promoCode;

		db.getDatabase().collection('promotionCodes').find({"code": promoCode}).toArray(function(err, result)  {
			result = result[0];

			if (err) {
				throw err;
			}

			if (result && result.valid) {
				var discount = result.discount;
				db.getDatabase().collection('promotionCodes').remove({"code": promoCode},  function(err, results) {
					res.send(discount+"");
					});
			} else {
				res.send(0.0+"");
			}
		});
	});

	/**
	* This route returns a json objects with required  One Way flights from other Airlines.
	*
	*/

		app.get('/api/flights/searchOutSide/:origin/:destination/:departureDateTime/:classs' , function(req, res){
		var oneWay = {
			"origin": req.params.origin,
			"destination": req.params.destination,
		  	"departureDateTime": parseInt(req.params.departureDateTime),
			"class": req.params.classs
		};
		flights.getOtherFlights(oneWay , function(err ,data){
			if (err)
				throw err;

				else{
				res.json(data);
			}
		
	});

		});

/**
	* This route returns a json objects with required  RoundTrip flights from other Airlines.
	*
	*/

app.get('/api/flights/searchOutSideRound/:origin/:destination/:departingDate/:returningDate/:classs', function(req, res) {
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
        flights.getOtherFlights(outGoing,function(err ,data ){
        	if(err) throw err ;
        	else{
              result.outGoing = data ;
             
              flights.getOtherFlights(inComing,function(err ,d){
              	if(err) throw err ;
                result.inComing = d ;
                res.json(result) ;
             });
        	}
        	

        });

         
      
    }); 
 /**
	* This route returns a json objects with required  one way flights.
	*
	*/
		app.get('/api/flights/search/:origin/:destination/:departureDateTime/:classs' , function(req, res){
		var oneWay = {
			"origin": req.params.origin,
			"destination": req.params.destination,
			//"departureDateTime": parseInt(req.params.departureDateTime),
			"class": req.params.classs
		};
		flights.getOneWayFlights(oneWay , function(err ,data){
			if (err)
				throw err;

				else
				res.json(data);
			
		
	});

		});



/**
	* This route returns a json objects with required  RoundTrip flights.
	*
	*/
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

};
