App.controller('bookController-payment', function($scope, FlightsSrv, PersonalSrv, promotionSrv, $location, $ionicPopup, ionicDatePicker) {

   $scope.paymentData = {};


   var ipObj1 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.paymentData.expiry_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2030, 12, 31), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
   };

   $scope.openDatePicker = function(){
      if ($scope.paymentData.expiry_date) {
         ipObj1.inputDate = new Date($scope.paymentData.expiry_date);
      }
      ionicDatePicker.openDatePicker(ipObj1);
   };


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

         PersonalSrv.setCardholder($scope.paymentData.card_number);
         PersonalSrv.setMethod($scope.paymentData.method);
         PersonalSrv.setCardNumber($scope.paymentData.cardholder);
         PersonalSrv.setCVS($scope.paymentData.cvs);
         PersonalSrv.setExpiryDate($scope.paymentData.expiry_date);
         PersonalSrv.setBillingCountry($scope.paymentData.billing_country);
         PersonalSrv.setBillingCity($scope.paymentData.billing_city);
         PersonalSrv.setBillingState($scope.paymentData.billing_state);
         PersonalSrv.setZipCode($scope.paymentData.zip_code);
         PersonalSrv.setAddress($scope.paymentData.address);
         PersonalSrv.setPromotionCode($scope.paymentData.promo_code);

         $scope.paymentData.expiry_date = new Date($scope.paymentData.expiry_date);

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
                  number: $scope.paymentData.card_number,
                  cvc: $scope.paymentData.cvs,
                  exp_month: ($scope.paymentData.expiry_date.getMonth() + 1),
                  exp_year: $scope.paymentData.expiry_date.getFullYear()
               }, function(status, responseDep) {
                  if(responseDep.error){
                     console.log('payment error');
                     $scope.loading = false;
                     var alertPopup = $ionicPopup.alert({
                        title: 'Opps...',
                        template: '<center>Please enter a valid card information.</center>'
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
                                 number: $scope.paymentData.card_number,
                                 cvc: $scope.paymentData.cvs,
                                 exp_month: ($scope.paymentData.expiry_date.getMonth() + 1),
                                 exp_year: $scope.paymentData.expiry_date.getFullYear()
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
                                    $location.path('/tabs/confirmation');
                                    $scope.$apply();
                                 }
                              });
                           }
                        });
                     }
                     else{
                        console.log('payment done');
                        $scope.loading = false;
                        $location.path('/tabs/confirmation');
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
