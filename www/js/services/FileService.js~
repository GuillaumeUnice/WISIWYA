app.factory('Series', function($http, $q) {
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
