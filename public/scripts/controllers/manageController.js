App.controller('manageController', function($scope) {
   $scope.tabName = 'manage';
   $scope.tabPart = 'tab active';

   setTimeout(function() {
      setHeight('manage');
   }, 0);
});
