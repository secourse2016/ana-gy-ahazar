App.controller('bookController-payment', function($scope, FlightsSrv, PersonalSrv, promotionSrv, $location, $ionicPopup) {

   $scope.paymentData = {};
   //loading disabled
   $scope.loading = false;

   /*
   Promotion Code Validation
   */
   $scope.validation_pressed = false;
   $scope.success = false;

   $scope.validate = function() {
      $scope.validation_pressed = true;
      promotionSrv.checkCode($scope.paymentData.promo_code).success(function(response) {

         var num = parseFloat(response);
         if (num > 0.0) {
            $scope.success = true;
            $scope.discount = num * 100;
            var diff = ($scope.total_price - ($scope.total_price * num)) / 2;
            $scope.total_price -= ($scope.total_price * num);
            FlightsSrv.setTotalPrice($scope.total_price);
            FlightsSrv.setOutgoingPrice(FlightsSrv.getOutgoingPrice() - diff);
            FlightsSrv.setIncomingPrice(FlightsSrv.getIncomingPrice() - diff);
         }
         else {
            $scope.success = false;
         }
      });
   };

   /*
   To Get all the countries.
   */
   function Countries() {
      FlightsSrv.getCountries().success(function(countries) {
         $scope.Countries = countries;
      });
   }

   Countries();

   $scope.total_price = FlightsSrv.getTotalPrice();
   /*
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {

      $scope.submitted = true;
      console.log($scope.paymentData);
      // check to make sure the form is completely valid
      if (isValid) {
         //loading enabled
         $scope.loading = true;

         console.log('good');

         PersonalSrv.setCardholder($scope.cardholder);
         PersonalSrv.setMethod($scope.method);
         PersonalSrv.setCardNumber($scope.card_number);
         PersonalSrv.setCVS($scope.cvs);
         PersonalSrv.setExpiryDate($scope.card_expiry_date);
         PersonalSrv.setBillingCountry($scope.billing_country);
         PersonalSrv.setBillingCity($scope.billing_city);
         PersonalSrv.setBillingState($scope.billing_state);
         PersonalSrv.setZipCode($scope.zip_code);
         PersonalSrv.setAddress($scope.address);
         PersonalSrv.setPromotionCode($scope.promotion_code);

         FlightsSrv.getPublishableKey(FlightsSrv.getDepartureFlight().IP).success(function(publishableKeyDep) {
           if(publishableKeyDep === 'not found'){
             console.log('payment error');
             $scope.loading = false;
             $scope.$apply();
             var alertPopup = $ionicPopup.alert({
               title: 'Opps...',
               template: '<center>The booking service on the choosen airline is currently down. Please try again later.</center>'
             });
           }
           else{
             Stripe.setPublishableKey(publishableKeyDep);

             Stripe.card.createToken({
               number: $scope.card_number,
               cvc: $scope.cvs,
               exp_month: ($scope.card_expiry_date.getMonth() + 1),
               exp_year: $scope.card_expiry_date.getFullYear()
             }, function(status, responseDep) {
               if(responseDep.error){
                 console.log('payment error');
                 $scope.loading = false;
                 sweetAlert("Opps...", responseDep.error.message, "error");
                 var alertPopup = $ionicPopup.alert({
                   title: 'Opps...',
                   template: '<center>' + responseDep.error.message + '.</center>'
                 });
                 $scope.$apply();
               }
               else{
                 PersonalSrv.setPaymentTokenDep(responseDep.id);

                 if(FlightsSrv.getFlightType() == "round") {

                   FlightsSrv.getPublishableKey(FlightsSrv.getReturnFlight().IP).success(function(publishableKeyRet) {
                     if(publishableKeyRet === 'not found'){
                       console.log('payment error');
                       $scope.loading = false;
                       var alertPopup = $ionicPopup.alert({
                         title: 'Opps...',
                         template: '<center>The booking service on the choosen airline is currently down. Please try again later.</center>'
                       });
                       $scope.$apply();
                     }
                     else{
                       Stripe.setPublishableKey(publishableKeyRet);

                       Stripe.card.createToken({
                         number: $scope.card_number,
                         cvc: $scope.cvs,
                         exp_month: ($scope.card_expiry_date.getMonth() + 1),
                         exp_year: $scope.card_expiry_date.getFullYear()
                       }, function(status, responseRet) {
                         if(responseRet.error){
                           console.log('payment error');
                           $scope.loading = false;
                           var alertPopup = $ionicPopup.alert({
                             title: 'Opps...',
                             template: '<center>' + responseDep.error.message + '.</center>'
                           });
                           $scope.$apply();
                         }
                         else{
                           console.log('payment done');
                           PersonalSrv.setPaymentTokenRet(responseRet.id);
                           $scope.loading = false;
                           $location.url('/book/confirmation');
                           $scope.$apply();
                         }
                       });
                     }
                   });
                 }
                 else{
                   console.log('payment done');
                   $scope.loading = false;
                   $location.url('/book/confirmation');
                   $scope.$apply();
                 }
               }
             });
           }
         });
      }
      else {
         console.log('bad');
      }
   };
});
