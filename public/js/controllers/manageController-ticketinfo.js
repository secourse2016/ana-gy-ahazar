App.controller('manageController-ticketinfo', function($scope, ManageSrv, $location) {
   $scope.tabName = 'manage-ticketinfo';
   $scope.tabPart = 'tab-part-next active';

   $scope.title = 'Mr.';
   $scope.firstName = 'Kareem';
   $scope.lastName = 'Mokhtar';
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
   $scope.passport = 123456;

   $scope.cancel = function() {
      swal({
         title: "Are you sure?",
         text: "Once the reservation is deleted it can\'t be recovered!",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Yes, delete it!",
         closeOnConfirm: false
      },
      function(){
         ManageSrv.cancelReservation(ManageSrv.getBookingReference()).success(function() {
            console.log('done');
            $location.url('/');
            swal({
               title: "Deleted!",
               text: "Your reservation has been deleted.",
               type: "success"
            });
         });
      });

   };
});
