var db = require('./db');


exports.Reserve = function(reserve_info){
     db.getDatabase().collection('reservation').insertOne(reserve_info) ;
} 