'use strict';

angular.module('issueTrackingSystem.home.homeController', [])
    .controller('HomeCtrl', [
        '$rootScope',
        'authenticationService',
        function HomeCtrl($rootScope, authenticationService) {
            var self = this;

            self.login = function login(user) {
                authenticationService
                    .loginUser(user)
                    .then(function (success) {
                        sessionStorage['userAuth'] = success.data.access_token;
                        sessionStorage['isAdmin'] = success.data.isAdmin;
                        $rootScope.$broadcast('$routeChangeStart');
                        $.notify("You successfully logged in!", "success");
                    }, function (error) {
                        $.notify("The username and the password don't match!", "error");
                    });
            };

            self.register = function register(user) {
                authenticationService
                    .registerUser(user)
                    .then(function (success) {
                        console.log(user);
                        console.log(user['email']);
                        $.notify("You successfully registered new user!", "success");
                        setTimeout(function(){
                            self.login(user);
                        }, 1500);
                    }, function (error) {
                        $.notify("Registration wasn't successful!", "error");
                    });
            };
        }]);
