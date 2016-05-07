'use strict';

angular
    .module('issueTrackingSystem.issues.addIssueController',[])
    .controller('AddIssueCtrl',[
        '$routeParams',
        'projectService',
        'userService',
        'issueService',
        function($routeParams, projectService, userService, issueService) {
            var projectId = $routeParams.id,
                self = this;

            projectService
                .getProjectByIdRequest(projectId)
                .then(function (success) {
                    self.priorities = success.Priorities;
                });

            self.addIssueRequest = function (issue) {
                issue = issueService.formatBindingIssueModel(issue, projectId);

                issueService
                    .addIssueRequest(issue)
                    .then(function(success){
                        $.notify('You successfully added new issue!','success');
                        issueService.updateMyIssues();
                        projectService.updateAssignedProjects();
                    }, function(error){
                        $.notify("Issue isn't created!",'error');
                    })
            }

        }]);