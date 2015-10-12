app.factory('Serie', function($http, $q) {
    var factory = {
        series : false,

        getSearchSeries : function(query){
            var deferred = $q.defer();

            $http.get("http://api.themoviedb.org/3/search/tv?api_key=61f7950a0c9e1089cf27fbcc524ec7db&query=" + query)
                .success(function(data, status) {
                    factory.series = data;
                    deferred.resolve(factory.series);
                }).error(function(data, status) {
                    deferred.reject('Erreur requete Ajax');
                });
            return deferred.promise;
        }
    };
    return factory;
});