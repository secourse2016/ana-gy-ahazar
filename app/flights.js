var db = require('./db');

/*
 all one way flights  
*/

var getOnewayflights = function(oneWay , callback){
    db.getDatabase().collection('flights').find(oneWay).toArray(function( err , data ){
         if (err){
            	callback(err);
            }else{
            	callback(null);
            }
    }); 
};


/*
The function is used to insert a feedback into Database.
*/
var addFeedback = function (feed, callback){
	db.getDatabase().collection('feedbacks').insert(feed, function(err, docs) {
		if (err){
            	callback(err);
            }else{
            	callback(null);
            }
	});
};