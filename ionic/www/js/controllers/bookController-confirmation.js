App.controller('bookController-confirmation', function($scope, FlightsSrv, PersonalSrv, $location, $ionicPopup){

   // Departure Flight Info
   var departureFlight = FlightsSrv.getDepartureFlight();
   $scope.departureOrigin = departureFlight.origin;
   $scope.departureDestination = departureFlight.destination;
   $scope.departureDepDate = departureFlight.departureDateTime;
   $scope.departureReturnDate = departureFlight.arrivalDateTime;
   $scope.departureClass = departureFlight.class;

   // Return Flight Info
   var returnFlight = FlightsSrv.getReturnFlight();
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

   $scope.adults = PersonalSrv.getAdultsInfo();
   $scope.children = PersonalSrv.getChildrenInfo();
   $scope.infants = PersonalSrv.getInfantsInfo();

   $scope.total_price = FlightsSrv.getTotalPrice();

   $scope.addReservation = function() {

      var dep_flight = FlightsSrv.getDepartureFlight();
      var ret_flight = FlightsSrv.getReturnFlight();
      var totalSeats = parseInt(FlightsSrv.getAdults()) + parseInt(FlightsSrv.getChildren());

      //creating payment token
      var tokenDep = PersonalSrv.getPaymentTokenDep();
      var tokenRet = PersonalSrv.getPaymentTokenRet();
      //the token is created

      if (FlightsSrv.getFlightType() == "round") {
         var reservation = {
            'adults': $scope.adults,
            'children': $scope.children,
            'infants': $scope.infants,
            'dep_flight': dep_flight,
            'ret_flight': ret_flight,
            'dep_price': FlightsSrv.getOutgoingPrice(),
            'ret_price': FlightsSrv.getIncomingPrice(),
            'total_seats': totalSeats,
            'class': $scope.class,
            'type': 'Direct',
            'paymentTokenDep': tokenDep,
            'paymentTokenRet': tokenRet
         };
         FlightsSrv.storeReservation(reservation).success(function(response) {
            if (response === "error") {
               $scope.loading = false;
               var alertPopup = $ionicPopup.alert({
                  title: 'Opps...',
                  template: '<center>Something went wrong please try again!</center>'
               });
            }
            else {
               if(response.inIP){
                  $scope.loading = false;
                  var alertPopup = $ionicPopup.alert({
                     title: "Outgoing Flight Booking Reference: \n" + response.refNumOut + "\n You can review your booking in:\n" + response.outIP +
                     "\nIncoming Flight Booking Reference: \n" + response.refNumIn + "\n You can review your booking in:\n" + response.inIP,
                     template: '<center>Thank you for booking with us :)</center>'
                  });
               }
               else{
                  $scope.loading = false;
                  var alertPopup = $ionicPopup.alert({
                     title: "Booking Reference:\n" + response.refNumOut + "\n You can review your booking in:\n" + response.outIP,
                     template: '<center>Thank you for booking with us :)</center>'
                  });
               }
               $location.path('/tabs/home');
            }
         });
      }
      else {
         var reservation = {
            'adults': $scope.adults,
            'children': $scope.children,
            'infants': $scope.infants,
            'dep_flight': dep_flight,
            'dep_price': FlightsSrv.getOutgoingPrice(),
            'total_seats': totalSeats,
            'class': $scope.class,
            'type': 'Direct',
            'paymentTokenDep': tokenDep
         };

         FlightsSrv.storeReservation(reservation).success(function(response) {
            if (response === "error") {
               $scope.loading = false;
               var alertPopup = $ionicPopup.alert({
                  title: 'Opps...',
                  template: '<center>Something went wrong please try again!</center>'
               });
            }
            else {
               $scope.loading = false;
               var alertPopup = $ionicPopup.alert({
                  title: "Booking Reference:\n" + response.refNumOut + "\n You can review your booking in:\n" + response.outIP,
                  template: '<center>Thank you for booking with us :)</center>'
               });
               $location.path('/tabs/home');
            }
         })
         .error(function() {
            console.log('error');
         });
      }
   };
});
