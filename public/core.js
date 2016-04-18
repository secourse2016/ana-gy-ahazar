App = angular.module('App', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angularMoment']);

/**
* Configure The routes and set locationProvider for cleaner URLs.
*/
App.config(function($routeProvider, $locationProvider) {
   $routeProvider

   .when('/', {
      templateUrl: 'partials/book-search.html',
      controller: 'bookController-search'
   })

   .when('/book', {
      templateUrl: 'partials/book-search.html',
      controller: 'bookController-search'
   })

   .when('/book/flights', {
      templateUrl: 'partials/book-flights.html',
      controller: 'bookController-flights'
   })

   .when('/book/personalInformation', {
      templateUrl: 'partials/book-personalinfo.html',
      controller: 'bookController-personalinformation'
   })

   .when('/book/payment', {
      templateUrl: 'partials/book-payment.html',
      controller: 'bookController-payment'
   })

   .when('/book/confirmation', {
      templateUrl: 'partials/book-confirmation.html',
      controller: 'bookController-confirmation'
   })

   .when('/manage', {
      templateUrl: 'partials/manage-ticketsearch.html',
      controller: 'manageController-ticketsearch'
   })

   .when('/manage/ticketinfo', {
      templateUrl: 'partials/manage-ticketinfo.html',
      controller: 'manageController-ticketinfo'
   })

   .when('/check-in', {
      templateUrl: 'partials/checkin.html',
      controller: 'checkinController'
   })

   .when('/offers', {
      templateUrl: 'partials/offers.html',
      controller: 'offersController'
   });

   $locationProvider.html5Mode(true);
});
