App.controller('searchController', function($scope) {
   $scope.tabName = 'book';
   $scope.tabPart = 'tab active';


   setTimeout(function() {
      setHeight('book');
   }, 0);
});
