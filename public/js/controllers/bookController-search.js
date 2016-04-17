App.controller('bookController-search', function($scope, FlightsSrv, personalSrv, $location) {
   $('#btn-1').prop('checked', true);

   /*
   Angular Bootstrap Datepicker.
   */
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.altInputFormats = ['M!/d!/yyyy'];

   $scope.today = function() {
      $scope.dt1 = new Date();
      $scope.dt2 = new Date();
   };
   $scope.today();

   $scope.open1 = function() {
      $scope.popup1.opened = true;
   };

   $scope.open2 = function() {
      $scope.popup2.opened = true;
   };

   $scope.setDate1 = function(year, month, day) {
      $scope.dt1 = new Date(year, month, day);
   };

   $scope.setDate2 = function(year, month, day) {
      $scope.dt2 = new Date(year, month, day);
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

         personalSrv.setSelectedOriginAirport($scope.selectedOrigin);
         personalSrv.setSelectedDestinationAirport($scope.selectedDestination);
         personalSrv.setDepartureDate($scope.departureDate);
         personalSrv.setReturnDate($scope.returnDate);
         personalSrv.setClass($scope.class);
         personalSrv.setAdults($scope.Adult);
         personalSrv.setChildren($scope.children);
         personalSrv.setInfants($scope.infant);


         $location.url('/book/flights');
      }
      else {
         console.log('bad');
      }

   };
    // $scope.search = function() {
    //   personalSrv.getSelectedOriginAirport($scope.selectedOrigin);
    //   personalSrv.getSelectedDestinationAirport($scope.selectedDestination);
    //   personalSrv.getDepartureDate($scope.departureDate);
    //   personalSrv.getReturnDate($scope.returnDate);
    //   personalSrv.getClass($scope.class);
    //   personalSrv.getAdults($scope.Adult);
    //   personalSrv.getChildren($scope.children);
    //   personalSrv.getInfants($scope.infant);
    // };
});
