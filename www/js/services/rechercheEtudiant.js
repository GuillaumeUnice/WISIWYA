app.factory('Etudiants', function($http, $q) {
    var factory = {
        etudiants : false,

        getEtudiants : function(){
            var deferred = $q.defer();
            $http.get(window.location.href.replace('#',''))
                .success(function(data, status) {
                    factory.etudiants = data;
                    deferred.resolve(factory.etudiants);
                }).error(function(data, status) {
                    deferred.reject('Erreur requete Ajax');
                });
            return deferred.promise;
        }
    };
    return factory;
});