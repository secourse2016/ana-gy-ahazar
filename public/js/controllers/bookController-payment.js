App.controller('bookController-payment', function($scope, FlightsSrv, PersonalSrv, promotionSrv, $location) {

   /*
   Angular Bootstrap Datepicker.
   */
   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.altInputFormats = ['M!/d!/yyyy'];

   $scope.open = function() {
      $scope.popup.opened = true;
   };

   $scope.popup = {
      opened: false
   };

   /*
   Promotion Code Validation
   */
   $scope.validation_pressed = false;
   $scope.success = false;

   $scope.validate = function() {
      $scope.validation_pressed = true;

      promotionSrv.checkCode($scope.promo_code).success(function(response) {

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
   };

   Countries();

   $scope.total_price = FlightsSrv.getTotalPrice();
   /*
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // check to make sure the form is completely valid
      if (isValid) {
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

         $location.url('/book/confirmation');
      }
      else {
         console.log('bad');
      }

   };
});
