App.controller('bookController-outgoing', function($scope) {
   $scope.tabName = 'book-outgoing';
   $scope.tabPart = 'tab-part-next active';
   $scope.selected = 'Economy'; //should be changed to what sherien's send


   setTimeout(function() {
      setHeight('book-outgoing');
   }, 0);

   $scope.setSelected=function (name) {
       $scope.selected = name;  
   }

$scope.flights = [   {  "flightNumber": '1',
                           "depTime":'12:00 CAI (Cairo)',
                           "arrTime":'15:00 JED (Jeddah)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A319',
                           "class": 'Economy',
                           "price": '3,500 EGP',
                           "remaining_seats": '5'},

                        {  "flightNumber": '1',
                           "depTime":'12:00 CAI (Cairo)',
                           "arrTime":'15:00 JED (Jeddah)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A319',
                           "class": 'First',
                           "price": '5,000 EGP',
                           "remaining_seats": '0'},

                        {  "flightNumber": '1',
                           "depTime":'12:00 CAI (Cairo)',
                           "arrTime":'15:00 JED (Jeddah)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A319',
                           "class": 'Business',
                           "price": '4,200 EGP',
                           "remaining_seats": '1'},

                        {  "flightNumber": '2',
                           "depTime":'19:30 CAI (Cairo)',
                           "arrTime":'22:30 JED (Jeddah)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A322',
                           "class": 'Economy',
                           "price": '3,800 EGP',
                           "remaining_seats": '3'},

                           {  "flightNumber": '2',
                           "depTime":'19:30 CAI (Cairo)',
                           "arrTime":'22:30 JED (Jeddah)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A322',
                           "class": 'Business',
                           "price": '4,700 EGP',
                           "remaining_seats": '0'},

                           {  "flightNumber": '2',
                           "depTime":'19:30 CAI (Cairo)',
                           "arrTime":'22:30 JED (Jeddah)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A322',
                           "class": 'First',
                           "price": '5,300 EGP',
                           "remaining_seats": '4'}
                      ];

   // $scope.depTime = '12:00 CAI (Cairo)';
   // $scope.arrTime = '15:00 JED (Jeddah)';
   // $scope.duration = '3 hour(s)';
   // $scope.planeModel = 'Airbus A319';
   // $scope.ecTicketPrice = '3,500 EGP';
   // $scope.ecSeats = '4';

});
