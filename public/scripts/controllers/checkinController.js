App.controller('checkinController', function($scope) {
    $scope.tabName = 'check-in';
    $scope.isActive = ' active';

    setTimeout(function() {
      setHeight('check-in');
    }, 0);

});
