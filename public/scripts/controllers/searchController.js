App.controller('searchController', function($scope) {
   $scope.tabName = 'book';
   $scope.isActive = ' active';


   setTimeout(function() {
      setHeight('book');
   }, 0);
});
