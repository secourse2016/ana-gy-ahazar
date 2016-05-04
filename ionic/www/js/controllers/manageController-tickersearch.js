App.controller('manageController-tickersearch', function($scope, ManageSrv, $location) {

  $scope.data = {};

  $scope.submitted = false;
  $scope.submitForm = function(isValid) {
    $scope.submitted = true;

    if (isValid) {

      ManageSrv.getReservation($scope.data.reference).success(function(response) {
         if (response.length > 0) {
            ManageSrv.setReservationData(response[0]);
            ManageSrv.setBookingReference($scope.data.reference);
            $location.path('/tabs/manage/ticketInfo');
         }
         else {
            console.log('not found');
         }
      });


    }
    else {
      console.log('bad');
    }
  }
});
