App.controller('manageController-ticketinfo', function($scope, ManageSrv, $location){

   var reservationData = ManageSrv.getReservationData();
   console.log(reservationData);

   // Departure Flight Info
   var departureFlight = reservationData.dep_flight;
   $scope.departureOrigin = departureFlight.origin;
   $scope.departureDestination = departureFlight.destination;
   $scope.departureDepDate = departureFlight.departureDateTime;
   $scope.departureReturnDate = departureFlight.arrivalDateTime;
   $scope.departureClass = departureFlight.class;

   // Return Flight Info
   var returnFlight = reservationData.ret_flight;
   if (typeof returnFlight != 'undefined') {
      $scope.returnOrigin = returnFlight.origin;
      $scope.returnDestination = returnFlight.destination;
      $scope.returnDepDate = returnFlight.departureDateTime;
      $scope.returnReturnDate = returnFlight.arrivalDateTime;
      $scope.returnClass = returnFlight.class;

      $scope.showReturn = true;
   }
   else {
      $scope.showReturn = false;
   }

   $scope.adults = reservationData.adults;
   $scope.children = reservationData.children;
   $scope.infants = reservationData.infants;


   $scope.cancel = function() {
      console.log('cancel');
   };

   $scope.edit = function() {
      $location.path('/tabs/manage/ticketEdit');
   };
});
