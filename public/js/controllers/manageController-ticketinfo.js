App.controller('manageController-ticketinfo', function($scope, ManageSrv, $location) {

   $scope.origin = "Cario";
   $scope.destination = "Berlin";
   $scope.departureDate = "2/2/2";
   $scope.returnDate = "3/3/3";
   $scope.class = "First";

   $scope.adults = [
      {'title': 'Mr.', 'first_name': 'Kareem', 'last_name': 'Mokhtar', 'birth_date': '5/3/1995', 'nationality': 'Egyptian',
         'phone_number': "0123213123", 'passport': '13123', 'email': 'm@m.com', 'em_phone_number': '4324234424',
         'em_email': 'n@n.com', 'mealPreference': 'None', 'specialNeed': 'None'},
      {'title': 'Mr.', 'first_name': 'Nour','last_name': 'Khaled', 'birth_date': '19/9/1995', 'nationality': 'Egyptian',
         'phone_number': "2342342344", 'passport': '123', 'email': 'nour@m.com', 'em_phone_number': '4324234424',
         'em_email': 'n@n.com', 'mealPreference': 'None', 'specialNeed': 'None'}
   ];

   $scope.children = [{'first_name': 'Hassan', 'last_name': 'Ali'}];
   $scope.infants = [];

   var data = ManageSrv.getReservationData();

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
