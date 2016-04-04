App.controller('aboutusController', function($scope) {
    $scope.tabName = 'about-us';
    $scope.tabPart = 'tab active';

    setTimeout(function() {
      setHeight('about-us');
    }, 0);

});
