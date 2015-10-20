// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-timepicker', 'ionic-datepicker', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('home', {
    url : '/home',
    templateUrl : 'templates/home.html',
    controller : 'homeController'
  })

  $stateProvider.state('serie', {
    url : '/serie',
    templateUrl : 'templates/serie.html',
    controller : 'serieController'
  })

  $stateProvider.state('settingserie', {
    url : '/serie/{id:[0-9]{1,8}}',
    templateUrl : 'templates/settingSerie.html',
    controller : 'serieController'
  })

  /*$stateProvider.state('setting', {
    url : '/setting',
    templateUrl : 'templates/setting.html',
    controller : 'settingController'
  })*/

  $urlRouterProvider.otherwise('/home');
});




