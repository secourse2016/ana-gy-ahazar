App.controller('bookController-incoming', function($scope) {
   $scope.tabName = 'book-incoming';
   $scope.tabPart = 'tab-part-next active';
   $scope.selected = 'Economy'; //should be changed to what sherien's send

   setTimeout(function() {
      setHeight('book-incoming');
   }, 0);

   $scope.setSelected=function (name) {
       $scope.selected = name;  
   }

$scope.flights = [   {  "flightNumber": '3',
                           "depTime":'15:00 JED (Jeddah)',
                           "arrTime":'12:00 CAI (Cairo)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A323',
                           "class": 'Economy',
                           "price": '3,650 EGP',
                           "remaining_seats": "5"},

                        {  "flightNumber": '3',
                           "depTime":'15:00 JED (Jeddah)',
                           "arrTime":'12:00 CAI (Cairo)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A323',
                           "class": 'First',
                           "price": '5,070 EGP',
                           "remaining_seats": "0"},

                        {  "flightNumber": '3',
                           "depTime":'15:00 JED (Jeddah)',
                           "arrTime":'12:00 CAI (Cairo)',
                           "duration":'3 hour(s)',
                           "planeModel":'Airbus A323',
                           "class": 'Business',
                           "price": '4,222 EGP',
                           "remaining_seats": "1"},

                        {  "flightNumber": '4',
                           "depTime":'22:30 JED (Jeddah)',
                           "arrTime":'19:00 CAI (Cairo)',
                           "duration":'2.5 hour(s)',
                           "planeModel":'Airbus A321',
                           "class": 'Economy',
                           "price": '3,660 EGP',
                           "remaining_seats": "0"},

                           {  "flightNumber": '4',
                           "depTime":'22:30 JED (Jeddah)',
                           "arrTime":'19:00 CAI (Cairo)',
                           "duration":'2.5 hour(s)',
                           "planeModel":'Airbus A321',
                           "class": 'Business',
                           "price": '4,800 EGP',
                           "remaining_seats": "0"},

                           {  "flightNumber": '4',
                           "depTime":'22:30 JED (Jeddah)',
                           "arrTime":'19:00 CAI (Cairo)',
                           "duration":'2.5 hour(s)',
                           "planeModel":'Airbus A321',
                           "class": 'First',
                           "price": '5,350 EGP',
                           "remaining_seats": "4"}
                      ];

   // $scope.depTime = '18:30 JED (Jeddah)';
   // $scope.arrTime = '21:00 CAI (Cairo)';
   // $scope.duration = '2.5 hour(s)';
   // $scope.planeModel = 'Airbus A321';
   // $scope.ecTicketPrice = '3,500 EGP';
   // $scope.ecSeats = '8';

});
