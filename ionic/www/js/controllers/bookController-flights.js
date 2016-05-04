
App.controller('bookController-flights', function($scope, FlightsSrv, $location) {

   var search_other = FlightsSrv.getSearchOther();
   var flightType = FlightsSrv.getFlightType();
   $scope.dep_airport = FlightsSrv.getSelectedOriginAirport();
   $scope.ret_airport = FlightsSrv.getSelectedDestinationAirport();
   var depDate = new Date(FlightsSrv.getDepartureDate());
   var retDate = new Date(FlightsSrv.getReturnDate());
   var adults = FlightsSrv.getAdults();
   var children = FlightsSrv.getChildren();
   var infants = FlightsSrv.getInfants();
   var searchClass = FlightsSrv.getClass();
   $scope.total_people = parseInt(adults) + parseInt(children);
   var totalSeats = parseInt(adults) + parseInt(children);

   $scope.flightData = {};

   if (FlightsSrv.getFlightType() == "round") {
      $scope.show_incoming = true;

      var dep_month = (depDate.getMonth() + 1);
      if (dep_month < 10)
         dep_month = '0' + dep_month;

      var dep_day = depDate.getDate();
      if (dep_day < 10)
         dep_day = '0' + dep_day;

      var dep_time = depDate.getFullYear() + '-' + dep_month + '-' + dep_day;
      dep_time = moment(dep_time).toDate().getTime();
      console.log(dep_time);

      var ret_month = (retDate.getMonth() + 1);
      if (ret_month < 10)
         ret_month = '0' + ret_month;

      var ret_day = retDate.getDate();
      if (ret_day < 10)
         ret_day = '0' + ret_day;

      var ret_time = retDate.getFullYear() + '-' + ret_month + '-' + ret_day;
      ret_time = moment(ret_time).toDate().getTime();
      console.log(ret_time);

      FlightsSrv.getRoundFlights($scope.dep_airport, $scope.ret_airport, dep_time, ret_time, searchClass, totalSeats).success(function(response) {
         var myOutgoingFlights = response.outgoingFlights;
         for(var i = 0; i < myOutgoingFlights.length; i++) {
           myOutgoingFlights[i].IP = "54.191.202.17";
         }

         var myReturnFlights = response.returnFlights;
         for(var i = 0; i < myReturnFlights.length; i++) {
           myReturnFlights[i].IP = "54.191.202.17";
         }

         var departureHasFlights = (response.outgoingFlights.length > 0);
         var returnHasFlights = (response.returnFlights.length > 0);

         if(search_other){
            // $scope.loading = true;
            FlightsSrv.getOtherRoundFlights($scope.dep_airport, $scope.ret_airport, dep_time, ret_time, searchClass, totalSeats).success(function(res) {
               var otherOutgoingFlights = res.outgoingFlights;
               var otherReturnFlights = res.returnFlights;
               var allOutgoingFlights = concat(myOutgoingFlights, otherOutgoingFlights);
               var allReturnFlights = concat(myReturnFlights, otherReturnFlights);
               $scope.departureFlights = allOutgoingFlights;
               $scope.returnFlights = allReturnFlights;

               if (res.outgoingFlights.length > 0)
               $scope.dep_empty = false;
               else
               $scope.dep_empty = !departureHasFlights;


               if (res.returnFlights.length > 0)
               $scope.ret_empty = false;
               else
               $scope.ret_empty = !returnHasFlights;

               $scope.loading = false;
            });
         }
         else{
            $scope.departureFlights = myOutgoingFlights;
            $scope.returnFlights = myReturnFlights;
            $scope.dep_empty = !departureHasFlights;
            $scope.ret_empty = !returnHasFlights;
         }

      });
   }
   else {
      $scope.show_incoming = false;

      var dep_month = (depDate.getMonth() + 1);
      if (dep_month < 10)
         dep_month = '0' + dep_month;

      var dep_day = depDate.getDate();
      if (dep_day < 10)
         dep_day = '0' + dep_day;

      var dep_time = depDate.getFullYear() + '-' + dep_month + '-' + dep_day;
      dep_time = moment(dep_time + ' 12:00 AM', 'YYYY-MM-DD hh:mm A').toDate().getTime();

      FlightsSrv.getOneFlights($scope.dep_airport, $scope.ret_airport, dep_time, searchClass, totalSeats).success(function(response) {
         var myFlights = response.outgoingFlights;
         for(var i = 0; i < myFlights.length; i++) {
           myFlights[i].IP = "54.191.202.17";
         }

         var hasFlights = (response.outgoingFlights.length > 0);

         if(search_other){
            $scope.loading = true;
            FlightsSrv.getOtherOneFlights($scope.dep_airport, $scope.ret_airport, dep_time, searchClass, totalSeats).success(function(res) {
               var otherFlights = res.outgoingFlights;
               var allFlights = concat(myFlights, otherFlights);
               $scope.departureFlights = allFlights;

               if (res.outgoingFlights.length > 0)
               $scope.dep_empty = false;
               else
               $scope.dep_empty = !hasFlights;

               $scope.loading = false;
            });
         }
         else{
            $scope.departureFlights = myFlights;
            $scope.dep_empty = !hasFlights;
         }
      });
   }


   $scope.showInfo = function(flight) {

      FlightsSrv.setAirline(flight.Airline);
      FlightsSrv.setDepartureDateTime(flight.departureDateTime);
      FlightsSrv.setArrivalDateTime(flight.arrivalDateTime);
      FlightsSrv.setAircraftType(flight.aircraftType);
      FlightsSrv.setAircraftModel(flight.aircraftModel);
      FlightsSrv.setCost(flight.Cost);
      $location.path("/tabs/flights-details");
   };

   /*
   Validations
   */
   $scope.submitted = false;
   //should be editted
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');

         FlightsSrv.setDepartureFlight($scope.flightData.dep_flight);
         FlightsSrv.setReturnFlight($scope.flightData.ret_flight);
         var total_price = parseInt($scope.flightData.dep_flight.cost);
         if (typeof $scope.flightData.ret_flight != 'undefined')
            total_price += parseInt($scope.flightData.ret_flight.cost);
            
         FlightsSrv.setTotalPrice(total_price * parseInt($scope.total_people));
         $location.path("/tabs/personalInfo");

      }
      else {
         console.log('bad');
      }

   };

});

/*
To Concatinate 2 Arrays.
 */
var concat = function(x, y) {
   for (var i = 0; i < y.length; i++) {
      x.push(y[i]);
   }

   return x;
};
