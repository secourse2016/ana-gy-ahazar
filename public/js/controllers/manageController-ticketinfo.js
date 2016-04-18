App.controller('manageController-ticketinfo', function($scope, ManageSrv, $location) {

   var reservationData = ManageSrv.getReservationData();

   console.log(reservationData);
   // Departure Flight Info
   $scope.departureOrigin = reservationData.dep_flight.origin;
   $scope.departureDestination = reservationData.dep_flight.destination;
   $scope.departureDepDate = reservationData.dep_flight.departureDateTime;
   $scope.departureReturnDate = reservationData.dep_flight.arrivalDateTime;
   $scope.departureClass = reservationData.dep_flight.class;

   // Return Flight Info
   if (typeof reservationData.ret_flight != 'undefined') {
      $scope.returnOrigin = reservationData.ret_flight.origin;
      $scope.returnDestination = reservationData.ret_flight.destination;
      $scope.returnDepDate = reservationData.ret_flight.departureDateTime;
      $scope.returnReturnDate = reservationData.ret_flight.arrivalDateTime;
      $scope.returnClass = reservationData.ret_flight.class;

      $scope.showReturn = true;
   }
   else {
      $scope.showReturn = false;
   }

   $scope.adults = reservationData.adults;
   $scope.children = reservationData.children;
   $scope.infants = reservationData.infants;

   $scope.cancel = function() {
      swal({
         title: "Are you sure?",
         text: "Once the reservation is deleted it can\'t be recovered!",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Yes, delete it!",
         closeOnConfirm: false
      },
      function(){
         ManageSrv.cancelReservation(ManageSrv.getBookingReference()).success(function() {
            console.log('done');
            $location.url('/');
            swal({
               title: "Deleted!",
               text: "Your reservation has been deleted.",
               type: "success"
            });
         });
      });

   };
});
