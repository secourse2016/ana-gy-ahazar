var db = require('./db');

/*
 all one way flights  
*/

exports.getOneWayFlights = function(oneWay , callback){
    db.getDatabase().collection('flights').find(oneWay).toArray(function( err , data ){
         if (err){
            	callback(err);
            }else{
            	callback(null,data);
            }
    }); 
};


/*
The function is used to insert a feedback into Database.
*/
exports.addFeedback = function (feed, callback){
	db.getDatabase().collection('feedbacks').insert(feed, function(err, docs) {
		if (err){
            	callback(err);
            }else{
            	callback(null);
            }
	});
};