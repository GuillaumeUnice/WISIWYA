app.controller('serieController', function($scope, $rootScope, $ionicLoading, $stateParams, $cordovaCamera, $cordovaDatePicker, Series) {

  	$rootScope.alertTimes = [ 'month', 'week', 'minute'];
	$rootScope.geolocalisations = {
		school : 
		{
			longitute : '47',
			latitude : '7'
		},
		home :

		{
			longitute : '50',
			latitude : '8'
		}
	}  

$scope.addSerie = function(serie, datepickerObject, timePickerObject) {

			
		//console.log(serie.group);


       /* $scope.serie.startAt.setUTCMonth($scope.timePickerObject.getUTCMonth());
        $scope.serie.startAt.setUTCDate($scope.timePickerObject.getUTCDate()());
		$scope.serie.startAt.setUTCFullYear($scope.timePickerObject.getUTCFullYear());
		*/
		var selectedTime = new Date(timePickerObject.inputEpochTime * 1000);
		$rootScope.serieSchedule = serie;

		$rootScope.serieSchedule.startAt = datepickerObject.inputDate;

		//console.log($rootScope.serieSchedule.startAt.getUTCHours());
		$rootScope.serieSchedule.startAt.setUTCHours(selectedTime.getUTCHours());
		$rootScope.serieSchedule.startAt.setUTCMinutes(selectedTime.getUTCMinutes());
		$state.go('home');
		//console.log($rootScope.serieSchedule.startAt.getUTCHours());		
		//$rootScope.serieSchedule.startAt.setUTCHours(timePickerObject.getUTCHours());
		//$rootScope.serieSchedule.startAt.setUTCMinutes(timePickerObject.getUTCMinutes());
		//console.log('test : ' + datepickerObject.inputDate);	
}

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
    console.log(this.inputEpochTime);
  }
};
/*
function timePickerCallback(val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
    var selectedTime = new Date(val * 1000);
    console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
  }
}*/



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
        //datePickerCallback(val);
      }
    };
	/*var datePickerCallback = function (val) {
	  if (typeof(val) === 'undefined') {
	    console.log('No date selected');
	  } else {
	    $scope.datepickerObject.inputDate = val;
	    console.log('Selected date is : ', val)
	  }
	};*/


	$scope.$watch($stateParams.id, setSerie);
	function setSerie(){
	    if($stateParams.id) {
	      $scope.testa = Series.getDetailSeries($stateParams.id).then(function(data){
	        $scope.serie = data;   
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

  /*$scope.looool = function() {
      
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
  }*/

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
		  $scope.serie.imgURI = "data:image/jpeg;base64," + imageData;
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
