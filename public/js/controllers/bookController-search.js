App.controller('bookController-search', function($scope, FlightsSrv) {
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
   function Airports() {
      FlightsSrv.getAirportCodes().success(function(airports) {
         $scope.Airports = airports;
      });
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
});
