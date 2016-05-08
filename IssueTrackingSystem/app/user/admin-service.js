(function() {
    'use strict';

    angular
        .module('issueTrackingSystem.user.adminService', [])
        .factory('adminService', [
            '$q',
            '$http',
            'BASE_URL',
            'projectService',
            function ($q, $http, BASE_URL, projectService) {
                var adminService = {
                    makeAdmin: makeAdmin,
                    addProjectRequest: addProjectRequest,

                };

                function addProjectRequest(project) {
                    var deferred = $q.defer(),
                        accessToken = sessionStorage["userAuth"];

                    project = projectService.formatBindingProjectModel(project);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                    $http.post(BASE_URL + 'projects', project).then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                }

                function makeAdmin(userId) {
                    var deferred = $q.defer(),
                        accessToken = sessionStorage['userAuth'];

                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                    $http.put(BASE_URL + 'users/makeadmin', {
                            UserId: userId
                        })
                        .then(function (success) {
                            deferred.resolve(success.data);
                        }, function (error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                return adminService;
            }
        ]);
}());
