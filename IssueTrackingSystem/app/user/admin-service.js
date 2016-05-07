'use strict';

angular
    .module('issueTrackingSystem.user.adminService', [])
    .factory('adminService',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q,BASE_URL){
            var adminService = {
                makeAdmin : makeAdmin
            };

            function makeAdmin(userId){
                var deferred = $q.defer(),
                    accessToken = sessionStorage['userAuth'];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.put(BASE_URL + 'users/makeadmin', {UserId: userId})
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return adminService;
        }]);

