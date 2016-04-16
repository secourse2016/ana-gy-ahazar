var db = require('./db');
var moment = require('moment');

function randomBoolean(){
  var chosenBoolean = Math.random() < 0.5 ? true : false;
  return chosenBoolean
}
function randomNumberZeroToTwo(){
  var number = Math.floor(Math.random() * 3);
  if(number==0){
    return "business";
  }
  else{
    if(number==1){
      return "first";
    }
    else{
      return "economy";
    }
  }
  function chooseRandomElement(array){
    var number = Math.floor(Math.random() *(array.length));
    return array[number];

  }
  function generateFlightnumber()
  {
    var text = "";
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789"

    for( var i=0; i < 2; i++ ){
      text += letters.charAt(Math.floor(Math.random() * letters.length));

    }
    for( var i=0; i < 5; i++ ){
      text += numbers.charAt(Math.floor(Math.random() * numbers.length));

    }

    return text;
  }

  exports.seed =function(cb){
    for (var i = 0; i < 200; i++) {

      var generatedAircraftModel = Math.floor(100 + Math.random() * 900).toString();
      var aircraftTypeArray =[ "Aerospatiale","ATR","Airbus","Antonov"
      ,"Beechcraft","Boeing","BAC" ,"BAE","Comac","Convair","de Havilland","Bombardier",
      "Canadair","Embraer","Fairchild","Fokker","Ilyushin","Irkut","Lockheed","McDonnell Douglas","Mitsubishi",
      "Saab","Sukhoi","Tupolev","Vickers","Yakovlev"];
      var date_of_manufacture = moment('1990-06-10').toDate().getTime();

      var airCraft = 	{
        "aircraftModel": generatedAircraftModel,
        "date_of_manufacture": date_of_manufacture,
        "capacity": "300",
        "avg_speed": "700",
        "total_flight_hours": "2000",
        "in_flight_entertainment": 	{
          "wifi": randomBoolean(),
          "radio": randomBoolean(),
          "power_port": randomBoolean()
        }
      };
      var airCrafts = db.getDatabase().collection('airCrafts');
      airCrafts.insert(airCraft);
    }
    for (var i = 0; i < 200 i++) {
      var originOrDestination1 =["Mumbai","Cairo","Hong kong","Johannesburg","Riyadh","London Heathrew",
      "Las Vegas","Las Angeles"," Frankfurt","Rome"];

      var originOrDestination2 =["Delhi","Jeddah","Taiwan","Cape Town","Jeddah","New York-JohnF. Kennedy"
      ,"Las Angeles","San Francisco","Berlin","Milan"];

      var randomGeneratedCost = Math.floor(600 + Math.random()*8400);
      var number = Math.floor(Math.random() *(originOrDestination1.length));
      var fromTo = randomBoolean();
      if(fromTo){
        var origin= originOrDestination1[number];
        var destination= originOrDestination2[number];
      }
      else{
        var origin= originOrDestination2[number];
        var destination= originOrDestination1[number];
      }

      var flight =	{
        "Airline": "Air Madagascar",
        "flightNumber": generateFlightnumber(),
        "departureDateTime": "Date",
        "arrivalDateTime": "Date",
        "class": "String",
        "type": "Direct",
        "tranzit": [],
        "duration": "Number",
        "origin": origin,
        "destination": destination,
        "remaining_seats": "50",
        "cost": randomGeneratedCost ,
        "currency": "USD",
        "seatmap": 	[
          {
            "seat_id": "586",
            "taken": randomBoolean()
          }
        ],
        "aircraft_id": "String"
      }

    }
  }
