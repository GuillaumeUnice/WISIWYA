app.controller('RechercheStageCtrl', function($scope, $routeParams, Stages){

    $scope.test = Stages.getStages().then(function(stages){

        $scope.promotions = stages.promotions;
        $scope.stages = stages.offres;
        $scope.competences = stages.competences;

    }, function(msg){
        alert(msg);
    });

});