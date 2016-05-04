App.controller('manageController-ticketinfo', function($scope, ManageSrv, $location, $ionicPopup, $ionicLoading){

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

   // A confirm dialog
   $scope.cancel = function() {
      var confirmPopup = $ionicPopup.confirm({
         title: 'Confirmation',
         template: '<center>Are you sure you want to delete this reservation?</center>',
         cancelText: 'Cancel',
         okText: 'Yes'
      });

      confirmPopup.then(function(res) {
         if(res) {
            ManageSrv.cancelReservation(ManageSrv.getBookingReference()).success(function() {
               console.log('done');
               $ionicLoading.show({ template: 'Deleted Successfully', noBackdrop: true, duration: 2000 });
               $location.path('/tabs/home');
            });
         }
      });
   };

   $scope.edit = function() {
      $location.path('/tabs/manage/ticketEdit');
   };
});
