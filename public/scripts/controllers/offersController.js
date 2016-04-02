App.controller('offersController', function($scope) {
    $scope.tabName = 'offers';
    $scope.isActive = ' active';

    setTimeout(function() {
       setHeight('offers');
    }, 0);

});
