App.controller('checkinController', function($scope) {
    $scope.tabName = 'check-in';
    $scope.tabPart = 'tab active';

    setTimeout(function() {
      setHeight('check-in');
    }, 0);

});
