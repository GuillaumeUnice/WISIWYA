app.controller('serieController', function($scope, $rootScope, $ionicLoading, $stateParams, $cordovaCamera, $cordovaDatePicker, Series) {
  

$scope.addSerie = function(serie) {
		console.log(serie);
	//console.log($scope.serie.group);
	console.log(group);
	console.log(serie.group);
	//$rootScope.serie.push()
}
  //$scope.serie.group = 'month';

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
            $scope.serie.group = 'test';
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
