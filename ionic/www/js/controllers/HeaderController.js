App.controller('HeaderController', function($scope, $location) {
   $scope.navigate = function(path) {
      console.log(path);
      $location.path(path);
   };
});
