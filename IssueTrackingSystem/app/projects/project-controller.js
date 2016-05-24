(function() {
    'use strict';

    angular
        .module('issueTrackingSystem.projects.projectController', [])
        .controller('ProjectCtrl', [
            '$routeParams',
            'ModalService',
            'identityService',
            'projectService',
            'issueService',
            function($routeParams, ModalService, identityService, projectService, issueService) {
                var currentId = parseInt($routeParams.id),
                    self = this;

                //////////
                // Init //
                //////////
                init();

                self.showAddIssue = function() {
                    ModalService.showModal({
                        templateUrl: 'app/issues/issue-add.html',
                        controller: 'AddIssueCtrl'
                    }).then(function(modal) {
                        modal.element.modal();
                    });
                };

                self.showEditProject = function() {
                    ModalService.showModal({
                        templateUrl: 'app/projects/project-edit.html',
                        controller: 'EditProjectCtrl'
                    }).then(function(modal) {
                        modal.element.modal();
                    });
                };

                function init() {
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
                            .then(function(success) {
                                self.currentProject = success;
                            })
                    }

                    if (!self.projectIssues) {
                        issueService
                            .initProjectIssues(currentId)
                            .then(function(success) {
                                console.log(success);
                                //////////////////////////////////
                                // Set current project's issues //
                                //////////////////////////////////
                                self.projectIssues = success;
                            }, function(error) {
                                $.notify("Error occurred when tried to get the project's issues!", 'error');
                            });
                    }
                }
            }
        ]);
}());
