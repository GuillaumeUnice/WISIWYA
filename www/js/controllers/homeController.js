app.controller('homeController', function($scope, $rootScope, $cordovaGeolocation, $ionicPlatform, $cordovaLocalNotification) {


  document.addEventListener("deviceready", function () {


	$ionicPlatform.ready(function () {

/*
  cordova.plugins.notification.local.on("click", function (notification, state) {
                
        }, this)*/
	//	$scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            alert("The notification has been set");
        });
    //};
 
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }
		 //$scope.scheduleEveryMinuteNotification = function () {
	      $cordovaLocalNotification.schedule({
	        id: 1,
	        title: 'Title here',
	        text: 'Text here',
	        every: 'minute',
	        icon: "http://image.tmdb.org/t/p/w300/dpNeXLEnuKzAvbNwveJhNEiQvXZ.jpg",
            url: 'http://134.59.215.246:8100/#/serie/61889'
	      }).then(function (result) {
	        window.location.href = '#/serie';
	        $state.go('serie');
	      });
	//    };
	});


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

