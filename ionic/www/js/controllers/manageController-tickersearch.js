App.controller('manageController-tickersearch', function($scope, ManageSrv, $ionicPopup, $location) {

  $scope.data = {};

  var showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Invalid Number',
     template: '<center>We couldn\'t find a reservation with this booking number.</center>'
   });
 };

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
            showAlert();
         }
      });


    }
    else {
      console.log('bad');
    }
  }
});
