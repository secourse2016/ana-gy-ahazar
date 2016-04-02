App.controller('manageController', function($scope) {
   $scope.tabName = 'manage';
   $scope.isActive = ' active';

   setTimeout(function() {
      setHeight('manage');
   }, 0);

   $scope.title = 'Mr.';
   $scope.first_name = 'Nour ElDin';
   $scope.last_name = 'Khaled';

   $scope.nationality = 'Egyptian';

   var date_of_birth = new Date('9/19/1995');
   var month = date_of_birth.getUTCMonth()+1; //months from 1-12
   var day = date_of_birth.getUTCDate()+1;
   var year = date_of_birth.getUTCFullYear();

   $scope.date_of_birth = day + "/" + month + "/" + year;
   $scope.ticket_type = 'One Way';
   $scope.ticket_class = 'First';
   $scope.passport_number = 'E1223';
   $scope.meal_preference = 'Diet';

   $scope.contact_email = 'm@m.com';
   $scope.phone = '01001598881';

   $scope.em_contact_email = 'n@n.com';
   $scope.em_phone = '01097642897';

   $scope.flight_number = 'SE3000';
   $scope.flight_date = new Date();
   $scope.flight_class = 'First';
   $scope.flight_type = 'One Way';
   $scope.flight_tranzit = [];
   $scope.flight_duration = 90;
   $scope.flight_origin = 'Cairo';
   $scope.flight_destination = 'Jaddah';

   $scope.aircraft_model ='F230';
});
