App.controller('offersController', function($scope) {
    $scope.tabName = 'offers';
    $scope.tabPart = 'tab active';

    setTimeout(function() {
       setHeight('offers');
    }, 0);

});
