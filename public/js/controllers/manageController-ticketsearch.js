App.controller('manageController-ticketsearch', function($scope, ManageSrv, $location) {

   $('#btn-2').prop('checked', true);

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

         $location.url('/manage/ticketinfo');
         // ManageSrv.getReservation($scope.reference).success(function(response) {
         //    console.log(response);
         //    if (response.length > 0) {
         //       ManageSrv.setReservationData(response[0]);
         //       ManageSrv.setBookingReference($scope.reference);
         //    }
         //    else {
         //       sweetAlert("Invalid Number.", "We couldn\'t find a reservation with this booking number.", "error");
         //    }
         // });

      }
      else {
         console.log('bad');
      }

   };
});
