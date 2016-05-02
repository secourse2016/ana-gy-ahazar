App.controller('manageController-ticketinfo', function($scope){
  // Departure Flight Info
  var departureFlight = {'origin': 'CAI', 'destination': 'JED', 'departureDateTime': '4/4/4', 'arrivalDateTime': '5/5/5', 'class': 'economy'};
  $scope.departureOrigin = departureFlight.origin;
  $scope.departureDestination = departureFlight.destination;
  $scope.departureDepDate = departureFlight.departureDateTime;
  $scope.departureReturnDate = departureFlight.arrivalDateTime;
  $scope.departureClass = departureFlight.class;

  // Return Flight Info
  var returnFlight = {'origin': 'JED', 'destination': 'CAI', 'departureDateTime': '7/7/7', 'arrivalDateTime': '5/5/5', 'class': 'business'};
  if (typeof returnFlight != 'undefined') {
    $scope.returnOrigin = returnFlight.origin;
    $scope.returnDestination = returnFlight.destination;
    $scope.returnDepDate = returnFlight.departureDateTime;
    $scope.returnReturnDate = returnFlight.arrivalDateTime;
    $scope.returnClass = returnFlight.class;

    $scope.showReturn = true;
  }
  else {
    $scope.showReturn = false;
  }

  $scope.adults = [{'title': 'Mr.','first_name': 'Nour ElDin', 'last_name': 'Khaled', 'nationality': 'Egyptian', 'birth_date': '4/4/4', 'passport_number': '1234',
                    'email': 'm@m.com', 'phone_number': '123', 'em_email': 'n@n.com', 'em_phone_number': '456', 'mealPreference': 'None', "specialNeeds": 'None'},
                    {'title': 'Mr.','first_name': 'Hassan', 'last_name': 'Ali', 'nationality': 'Egyptian', 'birth_date': '4/4/4', 'passport_number': '1234',
                    'email': 'm2@2m.com', 'phone_number': '124353', 'em_email': 'n2@2n.com', 'em_phone_number': '456', 'mealPreference': 'None', "specialNeeds": 'None'}  ];

  $scope.children = [{'first_name': 'Nour ElDin', 'last_name': 'Khaled', 'nationality': 'Egyptian', 'birth_date': '4/4/4', 'passport_number': '1234',
                                                         'mealPreference': 'None', "specialNeeds": 'None'},
                                                        {'title': 'Mr.','first_name': 'Hassan', 'last_name': 'Ali', 'nationality': 'Egyptian', 'birth_date': '4/4/4', 'passport_number': '1234',
                                                         'mealPreference': 'None', "specialNeeds": 'None'}  ];

  $scope.infants = [{'first_name': 'Nour ElDin', 'last_name': 'Khaled', 'nationality': 'Egyptian', 'birth_date': '4/4/4', 'passport_number': '1234',
                                                         'mealPreference': 'None', "specialNeeds": 'None'},
                                                        {'title': 'Mr.','first_name': 'Hassan', 'last_name': 'Ali', 'nationality': 'Egyptian', 'birth_date': '4/4/4', 'passport_number': '1234',
                                                         'mealPreference': 'None', "specialNeeds": 'None'}  ];



});
