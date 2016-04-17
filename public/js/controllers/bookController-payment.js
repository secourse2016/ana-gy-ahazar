App.controller('bookController-payment', function($scope, $http, personalSrv, $location) {

   /*
      To Get all the countries.
    */
   $http.get('/api/countries').success(function (res){
     $scope.countries = res;
   });

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
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');

         personalSrv.setCardholder($scope.cardholder);
         personalSrv.setMethod($scope.method);
         personalSrv.setCardNumber($scope.card_number);
         personalSrv.setCVS($scope.cvs);
         personalSrv.setExpiryDate($scope.card_expiry_date);
         personalSrv.setBillingCountry($scope.billing_country);
         personalSrv.setBillingCity($scope.billing_city);
         personalSrv.setBillingState($scope.billing_state);
         personalSrv.setZipCode($scope.zip_code);
         personalSrv.setAddress($scope.address);
         personalSrv.setPromotionCode($scope.promotion_code);
         
         $location.url('/book/confirmation');
      }
      else {
         console.log('bad');
      }

   };
/*get payment info*/
   // $scope.next = function() {
   // personalSrv.getCardholder($scope.cardholder);
   // personalSrv.getMethod($scope.method);
   // personalSrv.getCardNumber($scope.card_number);
   // personalSrv.getCVS($scope.cvs);
   // personalSrv.getExpiryDate($scope.card_expiry_date);
   // personalSrv.getBillingCountry($scope.billing_country);
   // personalSrv.getBillingCity($scope.billing_city);
   // personalSrv.getBillingState($scope.billing_state);
   // personalSrv.getZipCode($scope.zip_code);
   // personalSrv.getAddress($scope.address);
   // personalSrv.getPromotionCode($scope.promotion_code);

   // };

});
