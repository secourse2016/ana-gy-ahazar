
App.controller('bookController-flights', function($scope, FlightsSrv, $location) {

   // Get The values from the previous view (search view).
   $scope.flight_type = FlightsSrv.getFlightType();
   $scope.dep_airport = FlightsSrv.getSelectedOriginAirport();
   $scope.ret_airport = FlightsSrv.getSelectedDestinationAirport();
   $scope.dep_date = FlightsSrv.getDepartureDate();
   $scope.ret_date = FlightsSrv.getReturnDate();
   $scope.class = FlightsSrv.getClass();
   $scope.adults = FlightsSrv.getAdults();
   $scope.children = FlightsSrv.getChildren();
   $scope.total_people = parseInt($scope.children) + parseInt($scope.adults);
   var search_other = FlightsSrv.getSearchOther();
   var totalSeats = parseInt(FlightsSrv.getAdults()) + parseInt(FlightsSrv.getChildren());

   var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
   var months = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];

   // To get the month name.
   $scope.monthName = function(m) {
      return months[m];
   };
   // To get the day name.
   $scope.dayName = function(m) {
      return days[m];
   };

   /* ====================== For Departure Dates ====================== */

   /* Make the array of dates with tolerence +/-2 days. */
   var dep_date = new Date($scope.dep_date);
   var dep_beforeTwo = new Date(dep_date);
   var dep_beforeOne = new Date(dep_date);
   var dep_afterOne = new Date(dep_date);
   var dep_afterTwo = new Date(dep_date);

   dep_beforeTwo.setDate(dep_date.getDate() - 2);
   dep_beforeOne.setDate(dep_date.getDate() - 1);
   dep_afterOne.setDate(dep_date.getDate() + 1);
   dep_afterTwo.setDate(dep_date.getDate() + 2);

   $scope.dep_dates = [dep_beforeTwo, dep_beforeOne, dep_date, dep_afterOne, dep_afterTwo];

   /*
   This function gets the flights associated with the checked date.
   */
   $scope.dep_show = function() {
      // Change the scope departure date and call showDepartureFlights function to show the new flights.
      $scope.dep_date = $scope.dradioModel;
      $scope.showDepartureFlights();
   };

   /*
   This function gets the 5 previous days starting from the last day on the left.
   */
   $scope.dep_prev = function() {
      var dep_leastDate = $scope.dep_dates[0];
      var dep_prevBy1 = new Date(dep_leastDate);
      var dep_prevBy2 = new Date(dep_leastDate);
      var dep_prevBy3 = new Date(dep_leastDate);
      var dep_prevBy4 = new Date(dep_leastDate);
      var dep_prevBy5 = new Date(dep_leastDate);

      dep_prevBy1.setDate(dep_leastDate.getDate() - 1);
      dep_prevBy2.setDate(dep_leastDate.getDate() - 2);
      dep_prevBy3.setDate(dep_leastDate.getDate() - 3);
      dep_prevBy4.setDate(dep_leastDate.getDate() - 4);
      dep_prevBy5.setDate(dep_leastDate.getDate() - 5);

      $scope.dep_dates = [dep_prevBy5, dep_prevBy4, dep_prevBy3, dep_prevBy2, dep_prevBy1];

      $scope.dradioModel = new Date(dep_prevBy1);
      $scope.dep_show();
   };


   /*
   This function gets the 5 next days starting from the last day on the right.
   */
   $scope.dep_next = function() {
      var dep_mostDate = $scope.dep_dates[4];
      var dep_nextBy1 = new Date(dep_mostDate);
      var dep_nextBy2 = new Date(dep_mostDate);
      var dep_nextBy3 = new Date(dep_mostDate);
      var dep_nextBy4 = new Date(dep_mostDate);
      var dep_nextBy5 = new Date(dep_mostDate);

      dep_nextBy1.setDate(dep_mostDate.getDate() + 1);
      dep_nextBy2.setDate(dep_mostDate.getDate() + 2);
      dep_nextBy3.setDate(dep_mostDate.getDate() + 3);
      dep_nextBy4.setDate(dep_mostDate.getDate() + 4);
      dep_nextBy5.setDate(dep_mostDate.getDate() + 5);

      $scope.dep_dates = [dep_nextBy1, dep_nextBy2, dep_nextBy3, dep_nextBy4, dep_nextBy5];

      $scope.dradioModel = new Date(dep_nextBy1);
      $scope.dep_show();
   };


   /*
   This function is used to call the service for departure flights.
    */
   $scope.showDepartureFlights = function() {

      var month = ($scope.dep_date.getMonth() + 1);
      if (month < 10)
         month = '0' + month;

      var day = $scope.dep_date.getDate();
      if (day < 10)
         day = '0' + day;

      var dep_time = $scope.dep_date.getFullYear() + '-' + month + '-' + day;
      dep_time = moment(dep_time).toDate().getTime();

      FlightsSrv.getOneFlights($scope.dep_airport, $scope.ret_airport, dep_time, $scope.dep_isSelected, totalSeats).success(function(response) {
         var myFlights = response.outgoingFlights;
         for(var i = 0; i < myFlights.length; i++) {
           myFlights[i].IP = "54.191.202.17";
         }

         var hasFlights = (response.outgoingFlights.length > 0);

         if(search_other){
            $scope.loading = true;
            FlightsSrv.getOtherOneFlights($scope.dep_airport, $scope.ret_airport, dep_time, $scope.dep_isSelected, totalSeats).success(function(res) {
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
   };

   $scope.dradioModel = new Date(dep_date);



   /* ====================== For Return Dates ====================== */

   /* Make the array of dates with tolerence +/-2 days. */
   var ret_date = new Date($scope.ret_date);
   ret_date.setDate(ret_date.getDate());
   var ret_beforeTwo = new Date(ret_date);
   var ret_beforeOne = new Date(ret_date);
   var ret_afterOne = new Date(ret_date);
   var ret_afterTwo = new Date(ret_date);

   ret_beforeTwo.setDate(ret_date.getDate() - 2);
   ret_beforeOne.setDate(ret_date.getDate() - 1);
   ret_afterOne.setDate(ret_date.getDate() + 1);
   ret_afterTwo.setDate(ret_date.getDate() + 2);

   $scope.ret_dates = [ret_beforeTwo, ret_beforeOne, ret_date, ret_afterOne, ret_afterTwo];


   /*
   This function gets the flights associated with the checked date.
   */
   $scope.ret_show = function() {
      // Change the scope departure date and call showDepartureFlights function to show the new flights.
      $scope.ret_date = $scope.retradioModel;
      $scope.showReturnFlights();
   };

   /*
   This function gets the 5 previous days starting from the last day on the left.
   */
   $scope.ret_prev = function() {
      var ret_leastDate = $scope.ret_dates[0];
      var ret_prevBy1 = new Date(ret_leastDate);
      var ret_prevBy2 = new Date(ret_leastDate);
      var ret_prevBy3 = new Date(ret_leastDate);
      var ret_prevBy4 = new Date(ret_leastDate);
      var ret_prevBy5 = new Date(ret_leastDate);

      ret_prevBy1.setDate(ret_leastDate.getDate() - 1);
      ret_prevBy2.setDate(ret_leastDate.getDate() - 2);
      ret_prevBy3.setDate(ret_leastDate.getDate() - 3);
      ret_prevBy4.setDate(ret_leastDate.getDate() - 4);
      ret_prevBy5.setDate(ret_leastDate.getDate() - 5);

      $scope.ret_dates = [ret_prevBy5, ret_prevBy4, ret_prevBy3, ret_prevBy2, ret_prevBy1];

      $scope.retradioModel = new Date(ret_prevBy1);
      $scope.ret_show();
   };

   /*
   This function gets the 5 next days starting from the last day on the right.
   */
   $scope.ret_next = function() {
      var ret_mostDate = $scope.ret_dates[4];
      var ret_nextBy1 = new Date(ret_mostDate);
      var ret_nextBy2 = new Date(ret_mostDate);
      var ret_nextBy3 = new Date(ret_mostDate);
      var ret_nextBy4 = new Date(ret_mostDate);
      var ret_nextBy5 = new Date(ret_mostDate);

      ret_nextBy1.setDate(ret_mostDate.getDate() + 1);
      ret_nextBy2.setDate(ret_mostDate.getDate() + 2);
      ret_nextBy3.setDate(ret_mostDate.getDate() + 3);
      ret_nextBy4.setDate(ret_mostDate.getDate() + 4);
      ret_nextBy5.setDate(ret_mostDate.getDate() + 5);

      $scope.ret_dates = [ret_nextBy1, ret_nextBy2, ret_nextBy3, ret_nextBy4, ret_nextBy5];

      $scope.retradioModel = new Date(ret_nextBy1);
      $scope.ret_show();
   };

   // This function is used to call the service for return flights.
   $scope.showReturnFlights = function() {

      var month = ($scope.ret_date.getMonth() + 1);
      if (month < 10)
         month = '0' + month;

      var day = $scope.ret_date.getDate();
      if (day < 10)
         day = '0' + day;

      var ret_time = $scope.ret_date.getFullYear() + '-' + month + '-' + day;
      ret_time = moment(ret_time).toDate().getTime();

      FlightsSrv.getOneFlights($scope.ret_airport, $scope.dep_airport, ret_time, $scope.ret_isSelected, totalSeats).success(function(response) {
         var myFlights = response.outgoingFlights;
         for(var i = 0; i < myFlights.length; i++) {
           myFlights[i].IP = "54.191.202.17";
         }

         var hasFlights = (response.outgoingFlights.length > 0);

         if(search_other){
            $scope.loading = true;
            FlightsSrv.getOtherOneFlights($scope.ret_airport, $scope.dep_airport, ret_time, $scope.ret_isSelected, totalSeats).success(function(res) {
               var otherFlights = res.outgoingFlights;
               var allFlights = concat(myFlights, otherFlights);
               $scope.returnFlights = allFlights;

               if (res.outgoingFlights.length > 0)
               $scope.ret_empty = false;
               else
               $scope.ret_empty = !hasFlights;

               $scope.loading = false;
            });
         }
         else{
            $scope.returnFlights = myFlights;
            $scope.ret_empty = !hasFlights;
         }
      });
   }

   $scope.loading = false;
   $scope.retradioModel = new Date(ret_date);

   $scope.dep_empty = false;
   $scope.ret_empty = false;

   if ($scope.flight_type == "round") {
      $scope.show_incoming = true;

      var dep_month = ($scope.dep_date.getMonth() + 1);
      if (dep_month < 10)
         dep_month = '0' + dep_month;

      var dep_day = $scope.dep_date.getDate();
      if (dep_day < 10)
         dep_day = '0' + dep_day;

      var dep_time = $scope.dep_date.getFullYear() + '-' + dep_month + '-' + dep_day;
      dep_time = moment(dep_time).toDate().getTime();

      var ret_month = ($scope.ret_date.getMonth() + 1);
      if (ret_month < 10)
         ret_month = '0' + ret_month;

      var ret_day = $scope.ret_date.getDate();
      if (ret_day < 10)
         ret_day = '0' + ret_day;

      var ret_time = $scope.ret_date.getFullYear() + '-' + ret_month + '-' + ret_day;
      ret_time = moment(ret_time).toDate().getTime();

      FlightsSrv.getRoundFlights($scope.dep_airport, $scope.ret_airport, dep_time, ret_time, $scope.class, totalSeats).success(function(response) {
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
            $scope.loading = true;
            FlightsSrv.getOtherRoundFlights($scope.dep_airport, $scope.ret_airport, dep_time, ret_time, $scope.class, totalSeats).success(function(res) {
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

      var dep_month = ($scope.dep_date.getMonth() + 1);
      if (dep_month < 10)
         dep_month = '0' + dep_month;

      var dep_day = $scope.dep_date.getDate();
      if (dep_day < 10)
         dep_day = '0' + dep_day;

      var dep_time = $scope.dep_date.getFullYear() + '-' + dep_month + '-' + dep_day;
      dep_time = moment(dep_time + ' 12:00 AM', 'YYYY-MM-DD hh:mm A').toDate().getTime();

      FlightsSrv.getOneFlights($scope.dep_airport, $scope.ret_airport, dep_time, $scope.class, totalSeats).success(function(response) {
         var myFlights = response.outgoingFlights;
         for(var i = 0; i < myFlights.length; i++) {
           myFlights[i].IP = "54.191.202.17";
         }

         var hasFlights = (response.outgoingFlights.length > 0);

         if(search_other){
            $scope.loading = true;
            FlightsSrv.getOtherOneFlights($scope.dep_airport, $scope.ret_airport, dep_time, $scope.class, totalSeats).success(function(res) {
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

   $scope.dep_isSelected = $scope.class;
   $scope.ret_isSelected = $scope.class;
   $scope.dep_price = 0;
   $scope.ret_price = 0;


   /*
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');

         FlightsSrv.setDepartureFlight($scope.dep_flight);
         FlightsSrv.setReturnFlight($scope.ret_flight);
         FlightsSrv.setOutgoingPrice(parseInt($scope.dep_price));
         FlightsSrv.setIncomingPrice(parseInt($scope.ret_price));
         FlightsSrv.setTotalPrice(parseInt($scope.dep_price) + parseInt($scope.ret_price));

         $location.url('/book/personalInformation');
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
