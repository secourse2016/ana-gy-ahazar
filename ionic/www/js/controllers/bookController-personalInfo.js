App.controller('bookController-personalInfo',function($scope, PersonalSrv, FlightsSrv, $location, ionicDatePicker) {
   $scope.adults = parseInt(FlightsSrv.getAdults());
   $scope.children = parseInt(FlightsSrv.getChildren());
   $scope.infants = parseInt(FlightsSrv.getInfants());

   $scope.adultFormData = [];
   $scope.childFormData = [];
   $scope.infantFormData = [];

   /*
   Datepicker initializations.
    */

    /* ============== Adults ============== */

   // Datepicker for Adult birth day.
   var adultIndex = 0;
   var ipObjAdult1 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.adultFormData[adultIndex].birth_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openAdultBirthDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjAdult1);
   };

   $scope.openBirthAdult = function(i) {
      adultIndex = i;
      openAdultBirthDatePicker();
   };

   // Datepicker for Adult issue date.
   var ipObjAdult2 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.adultFormData[adultIndex].issue_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openAdultIssueDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjAdult2);
   };

   $scope.openIssueAdult = function(i) {
      adultIndex = i;
      openAdultIssueDatePicker();
   };

   // Datepicker for Adult expiry date.
   var ipObjAdult3 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.adultFormData[adultIndex].expiry_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openAdultExpiryDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjAdult3);
   };

   $scope.openExpiryAdult = function(i) {
      adultIndex = i;
      openAdultExpiryDatePicker();
   };

   /* ============== Children ============== */

   // Datepicker for Child birth day.
   var childIndex = 0;
   var ipObjChild1 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.childFormData[childIndex].birth_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openChildBirthDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjChild1);
   };

   $scope.openBirthChild = function(i) {
      childIndex = i;
      openChildBirthDatePicker();
   };

   // Datepicker for Child issue date.
   var ipObjChild2 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.childFormData[childIndex].issue_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openChildIssueDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjChild2);
   };

   $scope.openIssueChild = function(i) {
      childIndex = i;
      openChildIssueDatePicker();
   };

   // Datepicker for Child expiry date.
   var ipObjChild3 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.childFormData[childIndex].expiry_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openChildExpiryDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjChild3);
   };

   $scope.openExpiryChild = function(i) {
      childIndex = i;
      openChildExpiryDatePicker();
   };

   /* ============== Infants ============== */

   // Datepicker for Infant birth day.
   var infantIndex = 0;
   var ipObjInfant31 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.infantFormData[infantIndex].birth_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openInfantBirthDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjInfant31);
   };

   $scope.openBirthInfant = function(i) {
      infantIndex = i;
      openInfantBirthDatePicker();
   };

   // Datepicker for Infant issue date.
   var ipObjInfant32 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.infantFormData[infantIndex].issue_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openInfantIssueDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjInfant32);
   };

   $scope.openIssueInfant = function(i) {
      infantIndex = i;
      openInfantIssueDatePicker();
   };

   // Datepicker for Infant expiry date.
   var ipObjInfant3 = {
      callback: function (val) {  //Mandatory
         console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.infantFormData[infantIndex].expiry_date = val;
      },
      from: new Date(), //Optional
      to: new Date(2018, 10, 30), //Optional
      showTodayButton: true,
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),      //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
   };

   var openInfantExpiryDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObjInfant3);
   };

   $scope.openExpiryInfant = function(i) {
      infantIndex = i;
      openInfantExpiryDatePicker();
   };

   $scope.numAdults = function(){
      return new Array($scope.adults);
   };

   $scope.numChildren = function(){
      return new Array($scope.children);
   };

   $scope.numInfants = function(){
      return new Array($scope.infants);
   };

   /*
   Validations
   */
   $scope.submitted = false;
   // function to submit the form after all validation has occurred
   $scope.submitForm = function(isValid) {
      $scope.submitted = true;

      // sala7 daaaah
      console.log($scope.adultFormData);
      console.log($scope.childFormData);
      console.log($scope.infantFormData);

      // check to make sure the form is completely valid
      if (isValid) {
         console.log('good');
         PersonalSrv.setAdultsInfo($scope.adultFormData);
         PersonalSrv.setChildrenInfo($scope.childFormData);
         PersonalSrv.setInfantsInfo($scope.infantFormData);

         $location.path('/tabs/payment');
      }
      else {
         console.log('bad');
      }

   };

});
