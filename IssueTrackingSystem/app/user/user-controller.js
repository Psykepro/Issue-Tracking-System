'use strict';

angular
    .module('issueTrackingSystem.user.usersController', [])
    .controller('UsersCtrl', [
        '$rootScope',
        '$location',
        'userService',
        'adminService',
        function UsersCtrl($rootScope, $location, userService, adminService) {
            var self = this;

            //////////
            // Init //
            //////////
            init();

            self.promoteToAdmin = function($event, userId){
                adminService.makeAdmin(userId)
                    .then(function(success){
                        userService.updateUsers();
                        $.notify('You successfully made new admin!', 'success');
                    }, function(error){
                        $.notify("Admin wasn't made!", 'error');
                    })
            };

            self.changePassword = function(account){
                userService.changePasswordRequest(account)
                    .then(function(success){
                        $location.path('#/');
                        $location.replace();
                        $.notify('You successfully changed the password!', 'success');
                    }, function(error){
                       if(error.status === 400){
                           self.account = {};
                           self.wrongPassword = true;
                           $.notify('You entered wrong password!', 'error');
                       }
                    })
            };



            function init() {
                if (!self.users) {
                    userService
                        .initUsers()
                        .then(function (success) {
                            ///////////////
                            // Set users //
                            ///////////////
                            self.users = success;
                        }, function (error) {
                            $.notify('Error occurred when tried to get the users!', 'error');
                        });
                }
            }
    }]);


