App.controller('bookController-search', function($scope, FlightsSrv, $location) {
   $('#btn-1').prop('checked', true);

   /*
   Angular Bootstrap Datepicker.
   */
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.altInputFormats = ['M!/d!/yyyy'];

   $scope.today = function() {
      $scope.departureDate = new Date();
      $scope.returnDate = new Date();
   };
   $scope.today();

   $scope.open1 = function() {
      $scope.popup1.opened = true;
   };

   $scope.open2 = function() {
      $scope.popup2.opened = true;
   };

   $scope.setDate1 = function(year, month, day) {
      $scope.departureDate = new Date(year, month, day);
   };

   $scope.setDate2 = function(year, month, day) {
      $scope.returnDate = new Date(year, month, day);
   };

   $scope.popup1 = {
      opened: false
   };

   $scope.popup2 = {
      opened: false
   };

   /*
   Angular Typeahead.
   */

   /* Retrieve List of Airports Codes */
   function Airports() {
      FlightsSrv.getAirportCodes().success(function(airports) {
         $scope.Airports = airports;
      });
   };

   /* Record User's Selected Origin Airport  */
   $scope.SetOriginAirport = function(originAirport) {
      FlightsSrv.setSelectedOriginAirport(originAirport);
   };

   /* Record User's Selected Destination Airport  */
   $scope.SetDestinationAirport = function(destAirport) {
      FlightsSrv.setSelectedDestinationAirport(destAirport);
   };

   Airports();

   /*
   To Fill The Dropdown Lists.
   */
   $scope.digits = [0,1,2,3,4,5,6,7,8,9];

   /*
   Make The Datepicker visible by default.
   */
   $scope.date_show = true;

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

         FlightsSrv.setSelectedOriginAirport($scope.selectedOrigin);
         FlightsSrv.setSelectedDestinationAirport($scope.selectedDestination);
         FlightsSrv.setDepartureDate($scope.departureDate);
         FlightsSrv.setReturnDate($scope.returnDate);
         FlightsSrv.setAdults($scope.Adult);
         FlightsSrv.setChildren($scope.child);
         FlightsSrv.setInfants($scope.infant);
         FlightsSrv.setClass($scope.class);

         $location.url('/book/flights');
      }
      else {
         console.log('bad');
      }

   };
});
