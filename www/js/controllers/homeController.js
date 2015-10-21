app.controller('homeController', function($scope, $rootScope, $cordovaGeolocation, $ionicPlatform, $cordovaLocalNotification) {

	$rootScope.geolocalisations = {
		school : 
		{
			longitude : '8',
			latitude : '44'
		},
		home :
		{
			longitude : '6',
			latitude : '44'
		}
	}
  
  document.addEventListener("deviceready", function () {
    $rootScope.$on('$cordovaLocalNotification:trigger', function(event, notification, state) {
      if( $rootScope.serieSchedule[notification.id] !== undefined ) {

          if($rootScope.serieSchedule[notification.id].seasons[0].episode_count ==  $rootScope.serieSchedule[notification.id].episode) {
            if($rootScope.serieSchedule[notification.id].number_of_seasons ==  $rootScope.serieSchedule[notification.id].season) {
              cordova.plugins.notification.local.cancel(notification.id, function() {
                  alert($rootScope.serieSchedule[notification.id].original_name + " is end!!!");
                  $rootScope.serieSchedule[notification.id] = null;
              });
            } else {
              $rootScope.serieSchedule[notification.id].season++;    
            }
            
          } else {
            $rootScope.serieSchedule[notification.id].episode++;  
          }
        }
    });

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        for(var index in $rootScope.geolocalisations) { 
          var location = $rootScope.geolocalisations[index];
          if((location.longitude == Math.ceil(position.coords.longitude)) 
            && (location.latitude == Math.ceil(position.coords.latitude))) {
            $rootScope.localisation = index;
          }
        }
        if($rootScope.localisation === undefined) { // default value
          $rootScope.localisation = 'school';  
        }
      }, function(err) {
        alert('GPS error');
      });
  });
})

