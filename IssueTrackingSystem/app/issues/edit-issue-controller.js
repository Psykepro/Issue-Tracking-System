'use strict';

angular
    .module('issueTrackingSystem.issues.editIssueController',[])
    .controller('EditIssueCtrl',[
        '$route',
        '$routeParams',
        'projectService',
        'identityService',
        'issueService',
        function($route, $routeParams, projectService, identityService, issueService) {
            var issueId = parseInt($routeParams.id),
                self = this;

            //////////
            // Init //
            //////////
            init();

            self.updateIssueRequest = function updateIssue(editedIssue) {
                issueService
                    .updateIssueRequest(issueId, editedIssue)
                    .then(function (success) {
                        issueService.updateCurrentIssue(success.data);
                        issueService.updateMyIssues();
                        $.notify('You successfully edited the issue!', 'success');
                    }, function (error) {
                        $.notify("Editing wasn't successful!", "error");
                    })
            };

            function init() {
                self.isIssueAssignee = identityService.isIssueAssignee;
                self.isProjectLeader = identityService.isProjectLeader;
                //////////////////////////////////////////////////////////
                // Check if need to update the currentProject reference //
                //////////////////////////////////////////////////////////
                if (!self.editIssue || self.editIssue.Id !== issueId) {
                    issueService
                        .initCurrentIssueById(issueId)
                        .then(function (success) {
                            self.editIssue = issueService.formatViewEditIssueModel(angular.copy(success));
                            projectService
                                .initCurrentProjectById(self.editIssue.Project.Id)
                                .then(function(success){
                                    self.issueProject = success;
                                }, function (error) {
                                    $.notify("Can't find this issue's project!", "error");
                                })
                        }, function (error) {
                            $.notify("Can't find this issue!", "error");
                        })
                }
            }
        }]);