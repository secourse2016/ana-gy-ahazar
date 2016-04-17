App.controller('bookController-flights', function($scope, $location) {

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
   var dep_date = new Date(); // should come from service.
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

   $scope.dradioModel = new Date(dep_date);



   /*
   For Return Dates.
   */
   var ret_date = new Date(); // should come from service.
   ret_date.setDate(ret_date.getDate() + 50);
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

   $scope.retradioModel = new Date(ret_date);


   $scope.dep_isSelected = "First";
   $scope.ret_isSelected = "First";

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
