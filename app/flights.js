var db = require('./db');


exports.Reserve = function(reserve_info){
     db.getDatabase().collection('reservation').insertOne(reserve_info) ;
} 


exports.getOneWayFlights = function(oneway,callback){
	 
       db.getDatabase().collection('flights').find(oneway).toArray(function(err,data){
              if(err){
              	callback(err) ;
              }
              else {
              	callback(null,data) ;
              }
    });
      
 

}; 
