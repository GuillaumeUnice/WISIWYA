// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

.factory('Series', function($http, $q) {
    var factory = {
        series : false,
        serie : false,

        getSearchSeries : function(query){
            var deferred = $q.defer();

            $http.get("http://api.themoviedb.org/3/search/tv?api_key=61f7950a0c9e1089cf27fbcc524ec7db&language=fr&query=" + query)
                .success(function(data, status) {
                    factory.series = data;
                    deferred.resolve(factory.series);
                }).error(function(data, status) {
                    deferred.reject('Erreur requete Ajax');
                });
            return deferred.promise;
        },
        getDetailSeries : function(id){
            var deferred = $q.defer();

            $http.get("http://api.themoviedb.org/3/tv/" + id + "?api_key=61f7950a0c9e1089cf27fbcc524ec7db&language=fr")
                .success(function(data, status) {
                    factory.serie = data;
                    deferred.resolve(factory.serie);
                }).error(function(data, status) {
                    deferred.reject('Erreur requete Ajax');
                });
            return deferred.promise;
        }

    };
    return factory;
})

.controller('homeController', function($scope, $ionicLoading) {
  $scope.test = 'Hola!';

})

.controller('serieController', function($scope, $ionicLoading, $stateParams, Series) {
  //$scope.test = 'Hola!';

  /*$scope.$on('$routeChangeStart', function(next, current) { 
   alert('lol');
 });*/

  function setSerie(){
      //console.log($stateParams);
        if($stateParams.id) {
          
          $scope.testa = Series.getDetailSeries($stateParams.id).then(function(data){
            $scope.serie = data.results;   
          }, function(msg){
              alert(msg);
          });       
        }

        
        //console.log(data);

  /*          $http.get("http://api.themoviedb.org/3/tv/" + $stateParams.id + "?api_key=61f7950a0c9e1089cf27fbcc524ec7db&language=fr")
                .success(function(data, status) {
                    alert('lol');
                factory.series = data;
                    deferred.resolve(factory.series);
                }).error(function(data, status) {
                    alert('lil');
                    deferred.reject('Erreur requete Ajax');
                });
*/
  };

   $scope.$watch($stateParams.id, setSerie);
  $scope.search = function(serie) {
     $ionicLoading.show({
      template: 'Search...'
    });


    $scope.test = Series.getSearchSeries(serie).then(function(data){
        $scope.series = data.results;
    }, function(msg){
        alert(msg);
    });
    $ionicLoading.hide();

  //  alert(serie);
  }
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




