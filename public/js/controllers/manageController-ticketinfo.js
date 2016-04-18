App.controller('manageController-ticketinfo', function($scope, ManageSrv, $location) {

   var reservationData = ManageSrv.getReservationData();

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

   // $scope.adults = [
   //    {'title': 'Mr.', 'first_name': 'Kareem', 'last_name': 'Mokhtar', 'birth_date': '5/3/1995', 'nationality': 'Egyptian',
   //       'phone_number': "0123213123", 'passport': '13123', 'email': 'm@m.com', 'em_phone_number': '4324234424',
   //       'em_email': 'n@n.com', 'mealPreference': 'None', 'specialNeed': 'None'},
   //    {'title': 'Mr.', 'first_name': 'Nour','last_name': 'Khaled', 'birth_date': '19/9/1995', 'nationality': 'Egyptian',
   //       'phone_number': "2342342344", 'passport': '123', 'email': 'nour@m.com', 'em_phone_number': '4324234424',
   //       'em_email': 'n@n.com', 'mealPreference': 'None', 'specialNeed': 'None'}
   // ];
   //
   // $scope.children = [{'first_name': 'Hassan', 'last_name': 'Ali'}];
   // $scope.infants = [];
   //
   // var data = ManageSrv.getReservationData();

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
