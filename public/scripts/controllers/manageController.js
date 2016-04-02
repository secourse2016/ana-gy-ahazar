App.controller('manageController', function($scope) {
   $scope.tabName = 'manage';
   $scope.isActive = ' active';

   setTimeout(function() {
      setHeight('manage');
   }, 0);
});
