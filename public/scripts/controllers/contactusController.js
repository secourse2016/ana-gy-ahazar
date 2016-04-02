App.controller('contactusController', function($scope) {
    $scope.tabName = 'contact-us';
    $scope.isActive = ' active';

    setTimeout(function() {
      setHeight('contact-us');
    }, 0);

});
