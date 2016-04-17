App.controller('manageController-ticketsearch', function($scope,ManageSrv, $location) {

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
         ManageSrv.setLastName($scope.last_name);
         ManageSrv.setBookingReference($scope.reference);
         $location.url('/manage/ticketinfo');
      }
      else {
         console.log('bad');
      }

   };
});
