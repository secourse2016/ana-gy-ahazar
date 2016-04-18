
App.controller('bookController-flights', function($scope, FlightsSrv, $location) {
   // Get The values from the previous view (search view).
   $scope.flight_type = FlightsSrv.getFlightType();
   $scope.dep_airport = FlightsSrv.getSelectedOriginAirport();
   $scope.ret_airport = FlightsSrv.getSelectedDestinationAirport();
   $scope.dep_date = FlightsSrv.getDepartureDate();
   $scope.ret_date = FlightsSrv.getReturnDate();
   $scope.class = FlightsSrv.getClass();

   var dep_hour = $scope.dep_date.getHours() - ($scope.dep_date.getHours() >= 12 ? 12 : 0);
   var dep_period = $scope.dep_date.getHours() >= 12 ? 'PM' : 'AM';

   var departureTime = $scope.dep_date.getFullYear() + '-' + $scope.dep_date.getMonth() + '-' + $scope.dep_date.getDate() + '  ' + dep_hour + ':' +  $scope.dep_date.getMinutes() + ' ' + dep_period;

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

   /*
   For Departure Dates.
   */
   var dep_date = new Date($scope.dep_date);
   var dep_beforeTwo = new Date(dep_date);
   var dep_beforeOne = new Date(dep_date);
   var dep_afterOne = new Date(dep_date);
   var dep_afterTwo = new Date(dep_date);

   dep_beforeTwo.setDate(dep_date.getDate() - 2);
   dep_beforeOne.setDate(dep_date.getDate() - 1);
   dep_afterOne.setDate(dep_date.getDate() + 1);
   dep_afterTwo.setDate(dep_date.getDate() + 2);

   // Array that will store the dates.
   $scope.dep_dates = [dep_beforeTwo, dep_beforeOne, dep_date, dep_afterOne, dep_afterTwo];

   /*
   This function gets the flights associated with the checked date.
   */
   $scope.dep_show = function() {
      // show the appropiate data for this date.

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

   $scope.dradioModel = new Date(dep_date);



   /*
   For Return Dates.
   */
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

   // Array that will store the dates.
   $scope.ret_dates = [ret_beforeTwo, ret_beforeOne, ret_date, ret_afterOne, ret_afterTwo];

   /*
   This function gets the flights associated with the checked date.
   */
   $scope.ret_show = function() {
      // show the appropiate data for this date.

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

   $scope.retradioModel = new Date(ret_date);

   if ($scope.flight_type == "round") {
      $scope.show_incoming = true;
      var ret_hour = $scope.ret_date.getHours() - ($scope.ret_date.getHours() >= 12 ? 12 : 0);
      var ret_period = $scope.ret_date.getHours() >= 12 ? 'PM' : 'AM';
      var returnTime = $scope.ret_date.getFullYear() + '-' + $scope.ret_date.getMonth() + '-' + $scope.ret_date.getDate() + '  ' + ret_hour + ':' +  $scope.ret_date.getMinutes() + ' ' + ret_period;

      // console.log(departureTime);
      // console.log(returnTime);
      FlightsSrv.getFlights($scope.dep_airport, $scope.ret_airport, departureTime, returnTime, $scope.class).success(function(response) {
         console.log(response);
      });
   }
   else {
      $scope.show_incoming = false;
   }

   $scope.dep_isSelected = $scope.class;
   $scope.ret_isSelected = $scope.class;

   $scope.flights = [   {  "flightNumber": '1',
   "depTime":'12:00',
   "arrTime":'15:00',
   "duration":'3 hour(s)',
   "planeModel":'Airbus A319',
   "class": 'Economy',
   "price": '3,500 EGP',
   "stops": '2',
   "remaining_seats": '5',
   "entertainment": [
      "Wifi", "Radio"
   ]},

   {  "flightNumber": '2',
   "depTime":'12:00',
   "arrTime":'15:00',
   "duration":'3 hour(s)',
   "planeModel":'Airbus A319',
   "class": 'First',
   "stops": '2',
   "price": '5,000 EGP',
   "remaining_seats": '0',
   "entertainment": [
      "Radio"
   ]},

   {  "flightNumber": '3',
   "depTime":'12:00',
   "arrTime":'15:00',
   "duration":'3 hour(s)',
   "planeModel":'Airbus A319',
   "class": 'Business',
   "stops": '2',
   "price": '4,200 EGP',
   "remaining_seats": '1',
   "entertainment": [
      "Wifi", "Radio"
   ]},

   {  "flightNumber": '4',
   "depTime":'19:30',
   "arrTime":'22:30',
   "duration":'3 hour(s)',
   "planeModel":'Airbus A322',
   "class": 'Economy',
   "price": '3,800 EGP',
   "stops": '2',
   "remaining_seats": '3',
   "entertainment": [
      "Wifi"
   ]},

   {  "flightNumber": '5',
   "depTime":'19:30',
   "arrTime":'22:30',
   "duration":'3 hour(s)',
   "planeModel":'Airbus A322',
   "class": 'Business',
   "price": '4,700 EGP',
   "stops": '2',
   "remaining_seats": '0',
   "entertainment": [
      "Power Cord", "Radio"
   ]}
];

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
      $location.url('/book/personalInformation');
   }
   else {
      console.log('bad');
   }

};
});
