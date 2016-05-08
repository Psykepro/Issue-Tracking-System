(function(){
 'use strict';

angular.module('issueTrackingSystem.common.services.labelService',[])
    .factory('labelService',[
        '$q',
        '$http',
        'BASE_URL',
        function labelService($q, $http, BASE_URL) {
        var labelService = {
            getFilteredLabels: getFilteredLabels
        };

        function getFilteredLabels(filter){
            var deferred = $q.defer();
            $http.get(BASE_URL + 'labels/?filter=' + filter)
                .then(function(success){
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return labelService;
    }]);   
}());
