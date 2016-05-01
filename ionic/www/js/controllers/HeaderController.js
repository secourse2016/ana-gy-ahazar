App.controller('HeaderController', function($scope, $ionicModal, FeedbackSrv) {
   $scope.data = {};

   // Create and load the Modal
   $ionicModal.fromTemplateUrl('feedback.html', function(modal) {
      $scope.feedbackModal = modal;
   }, {
      scope: $scope,
      animation: 'slide-in-up'
   });

   // This function sends the feedback to the API.
   $scope.send = function() {
      var r = FeedbackSrv.storeFeedback($scope.data);
      if (r) {
         window.plugins.toast.show("message", "short", "bottom");
      }
      // FeedbackSrv.storeFeedback($scope.data).success(function(response) {
      //    console.log(response);
      // });
      $scope.feedbackModal.hide();
      $scope.data = {};
   };

    // Open the feedback modal.
   $scope.open = function() {
      $scope.feedbackModal.show();
   };

   // Close the feedback modal.
   $scope.close = function() {
      $scope.feedbackModal.hide();
   };
});
