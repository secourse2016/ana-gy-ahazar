var App = angular.module('App', ['ngRoute']);

App.config(function($routeProvider, $locationProvider) {
   $routeProvider

   .when('/', {
      templateUrl: 'search.html',
      controller: 'searchController'
   })

   .when('/book', {
      templateUrl: 'search.html',
      controller: 'searchController'
   })

   .when('/manage', {
      templateUrl: 'manage.html',
      controller: 'manageController'
   })

   .when('/check-in', {
      templateUrl: 'checkin.html',
      controller: 'checkinController'
   })

   .when('/offers', {
      templateUrl: 'offers.html',
      controller: 'offersController'
   })

   .when('/about-us', {
      templateUrl: 'aboutus.html',
      controller: 'aboutusController'
   })

   .when('/contact-us', {
      templateUrl: 'contactus.html',
      controller: 'contactusController'
   });

   $locationProvider.html5Mode(true);
});

App.controller('searchController', function($scope) {
   $scope.tabName = 'book';
   $scope.isActive = ' active';
});

App.controller('manageController', function($scope) {
    $scope.tabName = 'manage';
    $scope.isActive = ' active';
});

App.controller('checkinController', function($scope) {
    $scope.tabName = 'check-in';
    $scope.isActive = ' active';
});

App.controller('offersController', function($scope) {
    $scope.tabName = 'offers';
    $scope.isActive = ' active';
});

App.controller('aboutusController', function($scope) {
    $scope.tabName = 'about-us';
    $scope.isActive = ' active';
});

App.controller('contactusController', function($scope) {
    $scope.tabName = 'contact-us';
    $scope.isActive = ' active';
});
