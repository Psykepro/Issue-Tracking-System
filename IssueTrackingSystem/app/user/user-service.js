'use strict';

angular.module('issueTrackingSystem.user.userService',[])
    .factory('userService',[
        '$q',
        '$http',
        'BASE_URL',
        function($q, $http, BASE_URL){
            var users = null;
            var userService = {
                initUsers: initUsers,
                updateUsers: updateUsers,
                getCurrentUserRequest: getCurrentUserRequest,
                getAllUsersRequest: getAllUsersRequest,
                changePasswordRequest: changePasswordRequest
            };

            function updateUsers(){
                userService
                    .getAllUsersRequest()
                    .then(function (success) {
                        users.ShallowCopy(success);
                    });
            }

            function initUsers(){
                var deferred = $q.defer();

                if(!users){
                    userService
                        .getAllUsersRequest()
                        .then(function (success) {
                            users = success;
                            deferred.resolve(users);
                        }, function(error){
                            deferred.reject(error);
                        });
                }else{
                    deferred.resolve(users);
                }

                return deferred.promise;
            }
            
            function getCurrentUserRequest(){
                var accessToken = sessionStorage['userAuth'],
                    deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

                $http.get(BASE_URL + 'users/me')
                    .then(function(success){
                        deferred.resolve(success);
                    },function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllUsersRequest(){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users')
                    .then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function changePasswordRequest(account){
                var accessToken = sessionStorage['userAuth'],
                    deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

                $http.post(BASE_URL + 'api/Account/ChangePassword', account)
                    .then(function(success){
                        deferred.resolve(success);
                    }, function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }
            

            return userService
        }]);
