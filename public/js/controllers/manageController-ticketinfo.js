App.controller('manageController-ticketinfo', function($scope,ManageSrv) {
   $scope.tabName = 'manage-ticketinfo';
   $scope.tabPart = 'tab-part-next active';

   $scope.title = 'Mr.';
   $scope.firstName = 'Kareem';
   $scope.lastName ='Mokhtar' ;
   $scope.age = 21;
   $scope.dateOfBirth = '05 / 03 / 1995';
   $scope.nationality = 'Egyptian';

   contactCode = '+2';
   contactPhoneNumber = '01122064666';
   $scope.contactEmail = 'kemdak@live.com';
   $scope.contactMobile = contactCode + contactPhoneNumber;

   contactECode = '+2';
   contactEPhoneNumber = '01122064666';
   $scope.contactEEmail = 'kemdak@live.com';
   $scope.contactEMobile = contactECode + contactEPhoneNumber;

   $scope.mealPreference = 'None';
   $scope.specialNeed = 'None';


});
