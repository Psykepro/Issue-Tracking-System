'use strict';

angular
    .module('issueTrackingSystem')
    .controller('MainCtrl', [
        '$scope',
        'identityService',
        'authenticationService',
        'userService',
        'ModalService',
        'issueService',
        'projectService',
        function($scope, identityService, authenticationService, userService, ModalService, issueService, projectService) {
            $scope.isAuthenticated = identityService.isAuthenticated;

            $scope.$on('$routeChangeStart', function() {
                if(!$scope.currentUser && sessionStorage['userAuth']){
                    userService.getCurrentUserRequest().then(function (success) {
                        var currentUser = success.data;
                        sessionStorage['userId'] = success.data.Id;
                        sessionStorage['isAdmin'] = success.data.isAdmin;
                        $scope.isAdmin = identityService.isAdmin;
                        $scope.currentUser = currentUser;
                    });
                }
            });

            $scope.showCreateProject = function(){
                ModalService.showModal({
                    templateUrl: 'app/projects/project-add.html',
                    controller: 'AddProjectCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                });
            };

            $scope.logout = function logout(){
                authenticationService
                    .logoutUser()
                    .then(function(success){
                        sessionStorage.removeItem("userAuth");
                        sessionStorage.removeItem("userId");
                        sessionStorage.removeItem("isAdmin");
                        $scope.currentUser = undefined;
                        issueService.logout();
                        projectService.logout();
                        $.notify("You logged out successfully!", "success");
                    }, function(error){
                        $.notify("You don't logged out successfully!", "error");
                    });
            };
        }]);