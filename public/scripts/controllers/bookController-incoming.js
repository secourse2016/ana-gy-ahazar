App.controller('bookController-incoming', function($scope) {
   $scope.tabName = 'book-incoming';
   $scope.tabPart = 'tab-part-next active';


   setTimeout(function() {
      setHeight('book-incoming');
   }, 0);

   $scope.depTime = '18:30 JED (Jeddah)';
   $scope.arrTime = '21:00 CAI (Cairo)';
   $scope.duration = '2.5 hour(s)';
   $scope.planeModel = 'Airbus A321';
   $scope.ecTicketPrice = '3,500 EGP';
   $scope.ecSeats = '8';

});
