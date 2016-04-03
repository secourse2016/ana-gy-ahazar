App.controller('bookController-outgoing', function($scope) {
   $scope.tabName = 'book-outgoing';
   $scope.tabPart = 'tab-part-next active';


   setTimeout(function() {
      setHeight('book-outgoing');
   }, 0);

   $scope.depTime = '12:00 CAI (Cairo)';
   $scope.arrTime = '15:00 JED (Jeddah)';
   $scope.duration = '3 hour(s)';
   $scope.planeModel = 'Airbus A319';
   $scope.ecTicketPrice = '3,500 EGP';
   $scope.ecSeats = '4';

});
