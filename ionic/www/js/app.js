// Air Madagascar

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
App = angular.module('App', ['ionic', 'angularMoment']);

App.run(function($ionicPlatform) {
   $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
         // for form inputs)
         cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

         // Don't remove this line unless you know what you are doing. It stops the viewport
         // from snapping when text inputs are focused. Ionic handles this internally for
         // a much nicer keyboard experience.
         cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
         StatusBar.styleDefault();
      }
   });
});

/*
Specify the states and set the default state.
 */
App.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider

   .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'templates/tabs.html'
   })

   .state('tabs.home', {
      url: '/home',
      views: {
         'tabs-home': {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'

         }
      }
   })

   .state('tabs.book-search', {
      url: '/book',
      views: {
         'tabs-book': {
            templateUrl: 'templates/book-search.html',
            controller: 'bookSearch'
         }
      }
   })

   .state('tabs.book-flights', {
      url: '/flights',
      views: {
         'tabs-book': {
            templateUrl: 'templates/book-flights.html',
            controller: 'bookController-flights'
         }
      }
   })

   .state('tabs.book-flights-details', {
      url: '/flights-details',
      views: {
         'tabs-book': {
            templateUrl: 'templates/book-flights-details.html',
            controller: 'bookController-flightDetails'
         }
      }
   })

   .state('tabs.book-personalInfo', {
      url: '/personalInfo',
      views: {
         'tabs-book': {
            templateUrl: 'templates/book-personalInfo.html',
            controller: 'bookController-personalInfo'
         }
      }
   })

   .state('tabs.book-payment', {
      url: '/payment',
      views: {
         'tabs-book': {
            templateUrl: 'templates/book-payment.html',
            controller: 'bookController-payment'

         }
      }
   })


   .state('tabs.book-confirmation', {
      url: '/confirmation',
      views: {
         'tabs-book': {
            templateUrl: 'templates/book-confirmation.html'
         }
      }
   })

   .state('tabs.manage-ticketSearch', {
      url: '/manage',
      views: {
         'tabs-manage': {
            templateUrl: 'templates/manage-ticketSearch.html',
            controller: 'manageController-tickersearch'
         }
      }
   })

   .state('tabs.manage-ticketInfo', {
      url: '/manage/ticketInfo',
      views: {
         'tabs-manage': {
            templateUrl: 'templates/manage-ticketInfo.html',
            controller: 'manageController-ticketinfo'
         }
      }
   })

   .state('tabs.manage-ticketEdit', {
      url: '/manage/ticketEdit',
      views: {
         'tabs-manage': {
            templateUrl: 'templates/manage-ticketEdit.html',
            controller: 'manageController-edit'
         }
      }
   })

   .state('tabs.about', {
      url: '/about',
      views: {
         'tabs-about': {
            templateUrl: 'templates/about.html'
         }
      }
   });

   $urlRouterProvider.otherwise('/tabs/home');
});
