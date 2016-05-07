'use strict';

angular
    .module('issueTrackingSystem.projects.projectController', [])
    .controller('ProjectCtrl',[
        '$scope',
        '$routeParams',
        'ModalService',
        'identityService',
        'projectService',
        'issueService',
        'Pagination',
        function($scope, $routeParams, ModalService, identityService, projectService, issueService, Pagination) {
            var currentId = parseInt($routeParams.id),
                self = this;

            //////////
            // Init //
            //////////
            init();

            self.showAddIssue = function () {
                ModalService.showModal({
                    templateUrl: 'app/issues/issue-add.html',
                    controller: 'AddIssueCtrl'
                }).then(function (modal) {
                    modal.element.modal();
                });
            };

            self.showEditProject = function () {
                ModalService.showModal({
                    templateUrl: 'app/projects/project-edit.html',
                    controller: 'EditProjectCtrl'
                }).then(function (modal) {
                    modal.element.modal();
                });
            };

            function init() {
                var numPages;
                self.isAdmin = identityService.isAdmin;

                ////////////////////////////////////////////////
                // Set current default to show assigned issues //
                /////////////////////////////////////////////////
                self.onlyAssignedIssues = sessionStorage['userId'];

                //////////////////////////////////////////////////////////
                // Check if need to update the currentProject reference //
                //////////////////////////////////////////////////////////
                if (!self.currentProject || self.currentProject.Id !== currentId) {
                    projectService
                        .initCurrentProjectById(currentId)
                        .then(function(success){
                            self.currentProject = success;
                        })
                }

                if(!self.projectIssues){
                    issueService
                        .initProjectIssues(currentId)
                        .then(function(success){
                            //////////////////////////////////
                            // Set current project's issues //
                            //////////////////////////////////
                            self.projectIssues = success;
                        }, function(error){
                            $.notify("Error occurred when tried to get the project's issues!", 'error');
                        });
                }
            }
        }]);