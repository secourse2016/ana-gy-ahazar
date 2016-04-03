App.controller('contactusController', function($scope) {
    $scope.tabName = 'contact-us';
    $scope.tabPart = 'tab active';

    setTimeout(function() {
      setHeight('contact-us');
    }, 0);

});
