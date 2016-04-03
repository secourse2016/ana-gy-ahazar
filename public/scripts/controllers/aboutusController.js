App.controller('aboutusController', function($scope) {
    $scope.tabName = 'about-us';
    $scope.isActive = ' active';

    setTimeout(function() {
      setHeight('about-us');
    }, 0);

});
