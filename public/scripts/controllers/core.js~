App = angular.module('App', ['ngRoute', 'ngAnimate']);

App.config(function($routeProvider, $locationProvider) {
   $routeProvider

   .when('/', {
      templateUrl: 'book-search.html',
      controller: 'searchController'
   })

   .when('/book', {
      templateUrl: 'book-search.html',
      controller: 'searchController'
   })

   .when('/manage', {
      templateUrl: 'manage-ticketsearch.html',
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
