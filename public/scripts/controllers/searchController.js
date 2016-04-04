App.controller('searchController', function($scope, $http) {
   $scope.tabName = 'book';
   $scope.tabPart = 'tab active';


   setTimeout(function() {
      setHeight('book');
   }, 0);

   function AirportCodes() {
     $http.get('/api/airports').success(function(response) {
        $scope.Airports = response;
     });
   };

   AirportCodes();
});
