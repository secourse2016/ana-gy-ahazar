App.controller('manageController-tickersearch', function($scope, $location) {

  $scope.data = {};

  $scope.submitted = false;
  $scope.submitForm = function(isValid) {
    $scope.submitted = true;

    if (isValid) {

      // call the api


      $location.path('/tabs/manage/ticketInfo');
    }
    else {
      console.log('bad');
    }
  }
});
