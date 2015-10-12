app.controller('RechercheEtudiantCtrl', function($scope, $routeParams, Etudiants){

    $scope.test = Etudiants.getEtudiants().then(function(etudiant){
        $scope.promotions = etudiant.promotions;
        $scope.competences = etudiant.competences;
        $scope.etudiants = etudiant.etudiants;
    }, function(msg){
        alert(msg);
    });

});