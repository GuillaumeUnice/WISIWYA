// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic-timepicker', 'ionic-datepicker', 'ngCordova'])

.run(function($ionicPlatform, $cordovaPush) {
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



  var androidConfig = {
    "senderID": "replace_with_sender_id",
  };

  document.addEventListener("deviceready", function(){
    $cordovaPush.register(androidConfig).then(function(result) {
      alert('register');// Success
    }, function(err) {
      alert('error register');// Error
    })

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            alert('registration ID = ' + notification.regid);
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });


    // WARNING: dangerous to unregister (results in loss of tokenID)
    $cordovaPush.unregister(options).then(function(result) {
      alert('unregister');// Success!
    }, function(err) {
      alert('error unregister');// Error
    })

  }, false);

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

.controller('homeController', function($scope, $cordovaGeolocation) {

  $scope.test = 'Hola!';

  document.addEventListener("deviceready", function () {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        alert('latitude : ' + position.coords.latitude + ' longitude : ' + position.coords.longitude);
      }, function(err) {
        alert('error');// error
      });


    var watchOptions = {
      timeout : 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        alert('error');// error
      },
      function(position) {
        alert('latitude : ' + position.coords.latitude + ' longitude : ' + position.coords.longitude);
        var lat  = position.coords.latitude
        var long = position.coords.longitude
    });


    watch.clearWatch();
    // OR
    $cordovaGeolocation.clearWatch(watch)
      .then(function(result) {
        // success
        alert('latitude : ' + position.coords.latitude + ' longitude : ' + position.coords.longitude);
        }, function (error) {
        alert('error');// error
      });
  });
})



.directive('standardTimeMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

    function epochParser(val, opType) {
            if (val === null) {
              return "00:00";
            } else {
              if (opType === 'time') {
                var hours = parseInt(val / 3600);
                var minutes = (val / 60) % 60;

                return (prependZero(hours) + ":" + prependZero(minutes));
              }
            }
          }
          scope.$watch('etime', function(newValue, oldValue) {
            scope.stime = epochParser(scope.etime, 'time');
          });

        }
      };
    })

.controller('serieController', function($scope, $ionicLoading, $stateParams, $cordovaCamera, $cordovaDatePicker, Series) {
  //$scope.test = 'Hola!';

  /*$scope.$on('$routeChangeStart', function(next, current) { 
   alert('lol');
 });*/

$scope.timePickerObject = {
  inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
  step: 15,  //Optional
  format: 24,  //Optional
  titleLabel: '24-hour Format',  //Optional
  setLabel: 'Set',  //Optional
  closeLabel: 'Close',  //Optional
  setButtonType: 'button-positive',  //Optional
  closeButtonType: 'button-stable',  //Optional
  callback: function (val) {    //Mandatory
    timePickerCallback(val);
  }
};
function timePickerCallback(val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
    $scope.timePickerObject.inputEpochTime = val;
    //var selectedTime = new Date(val * 1000);
    //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
  }
}



 $scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      //disabledDates: disabledDates, //Optional
      //weekDaysList: weekDaysList,   //Optional
      //monthList: monthList, //Optional
      templateType: 'modal', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };
var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    $scope.datepickerObject.inputDate = val;
    console.log('Selected date is : ', val)
  }
};


  $scope.alertTimes = [ 'month', 'week', '5 min'];
  function setSerie(){
      //console.log($stateParams);
        if($stateParams.id) {
          
          $scope.testa = Series.getDetailSeries($stateParams.id).then(function(data){
            $scope.serie = data;   
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

  $scope.looool = function() {
      
      var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      minDate: new Date() - 10000,
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

    document.addEventListener("deviceready", function () {

      $cordovaDatePicker.show(options).then(function(date){
          alert(date);
      });

    }, false);
  }

   $scope.takePicture = function() {
        

document.addEventListener("deviceready", function () {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      //image.src = "data:image/jpeg;base64," + imageData;
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      alert('error');// error
    });

  }, false);
        //alert('lol');
        /*var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });*/
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




