app.controller('serieController', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicPlatform, $stateParams, $cordovaCamera, $cordovaDatePicker, $cordovaLocalNotification, Series) {

  	// Initialisation
  	$rootScope.alertTimes = [ 'month', 'week', 'minute'];
		$rootScope.geolocalisations = {
		school : 
		{
			longitude : '8',
			latitude : '48'
		},
		home :
		{
			longitude : '6',
			latitude : '44'
		}
	}

	$scope.geolocation = {};
	$scope.isTakePicture = false;


	$scope.$watch($stateParams.id, setSerie);
	function setSerie(){
	    if($stateParams.id) {
	      Series.getDetailSeries($stateParams.id).then(function(data){
	        $scope.serie = data;   
	        $scope.serie.season = 1;
	        $scope.serie.episode = 0;
	        console.log($scope.serie);
	      }, function(msg){
	          alert(msg);
	      });       
	    }
	};

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
		$scope.isTakePicture = true;
		$cordovaCamera.getPicture(options).then(function(imageData) {
		  var image = document.getElementById('myImage');
		  $scope.serie.imgURI = "data:image/jpeg;base64," + imageData;
		  $scope.isTakePicture = false;
		}, function(err) {
		  alert('error take picture');
		});

		}, false);
    }

    $scope.value = [];
    $scope.updateLocationValue = function(choice){
        $scope.value = $scope.value || [];
        if(choice.checked){
            $scope.value.push(choice.value);
            $scope.value = _.uniq($scope.value);
        }else{
            $scope.value = _.without($scope.value, choice.value);
        }
    };

	$scope.addSerie = function(serie, datepickerObject, timePickerObject, geolocation) {
		if(!$scope.isTakePicture){
			
		
	       	

			/*if(typeof($rootScope.serieSchedule[serie.id].imgURI) != "undefined") {
				$rootScope.serieSchedule[serie.id].poster_path = $rootScope.serieSchedule[serie.id].imgURI;
			} else {
				$rootScope.serieSchedule[serie.id].poster_path = "http://image.tmdb.org/t/p/w300/" + $rootScope.serieSchedule[serie.id].poster_path;
			}*/
			

			var selectedTime = new Date(timePickerObject.inputEpochTime * 1000);

			if($rootScope.serieSchedule === undefined) {
				$rootScope.serieSchedule = [];
			}
			$rootScope.serieSchedule[serie.id] = serie;

			$rootScope.serieSchedule[serie.id].geolocation = geolocation;

			$rootScope.serieSchedule[serie.id].startAt = datepickerObject.inputDate;

			$rootScope.serieSchedule[serie.id].startAt.setUTCHours(selectedTime.getUTCHours());
			$rootScope.serieSchedule[serie.id].startAt.setUTCMinutes(selectedTime.getUTCMinutes());
		 
			if($rootScope.serieSchedule[serie.id].geolocation[$rootScope.localisation]) {
				$cordovaLocalNotification.schedule({
			        id: serie.id,
			        title: 'Don\'t forgets',
			        text: serie.original_name,
			        every: $rootScope.serieSchedule[serie.id].group,
			       	//icon: serie.imgURI
			    });

			    $state.go('home');
			    alert('This serie has been added!!!');
			}	
		}
	} // addSerie()

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
	    this.inputEpochTime = val;
	  }
	};



	$scope.datepickerObject = {
	  titleLabel: 'Start at',  //Optional
	  todayLabel: 'Today',  //Optional
	  closeLabel: 'Close',  //Optional
	  setLabel: 'Set',  //Optional
	  setButtonType : 'button-assertive',  //Optional
	  todayButtonType : 'button-assertive',  //Optional
	  closeButtonType : 'button-assertive',  //Optional
	  inputDate: new Date(),    //Optional
	  mondayFirst: true,    //Optional
	  templateType: 'modal', //Optional
	  showTodayButton: 'true', //Optional
	  modalHeaderColor: 'bar-positive', //Optional
	  modalFooterColor: 'bar-positive', //Optional
	  from: new Date(2012, 8, 2),   //Optional
	  to: new Date(2018, 8, 25),    //Optional
	  callback: function (val) {    //Mandatory
	    this.inputDate = val;
	  }
	};

})
