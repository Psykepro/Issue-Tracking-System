(function() {
    'use strict';

    angular
        .module('issueTrackingSystem.issues.issueController', [])
        .controller('IssueCtrl', [
            '$routeParams',
            'issueService',
            'projectService',
            'identityService',
            'ModalService',
            function($routeParams, issueService, projectService, identityService, ModalService) {
                var issueId = parseInt($routeParams.id);
                var self = this;

                //////////
                // Init //
                //////////
                init();

                self.showEditIssue = function() {
                    ModalService.showModal({
                        templateUrl: 'app/issues/issue-edit.html',
                        controller: 'EditIssueCtrl'
                    }).then(function(modal) {
                        modal.element.modal();
                    });
                };

                self.changeStatus = function changeStatus(statusId) {
                    issueService
                        .updateIssueStatusRequest(issueId, statusId)
                        .then(function(success) {
                            issueService.updateCurrentIssueStatus(issueId);
                            $.notify('You successfully changed the status!', 'success');
                        }, function(error) {
                            $.notify('Some error occurred when tried to change the status!', 'error');
                        })
                };

                self.addComment = function addComment(comment) {
                    issueService
                        .addIssueCommentRequest(issueId, comment)
                        .then(function(success) {
                            issueService.updateCommentsByIssueId(issueId);
                            $.notify('You successfully added new comment!', 'success');
                        }, function(error) {
                            $.notify("You didn't succeed to add new comment!", 'error');
                        })
                };

                function init() {
                    self.isIssueAssignee = identityService.isIssueAssignee;
                    self.isProjectLeader = identityService.isProjectLeader;

                    ////////////////////////////////////////////////////////
                    // Check if need to update the currentIssue reference //
                    ////////////////////////////////////////////////////////
                    if (!self.currentIssue || self.currentIssue.Id !== issueId) {
                        issueService
                            .initCurrentIssueById(issueId)
                            .then(function(success) {
                                self.currentIssue = success;
                                console.log(success);
                                if (!issueService.issueProject || issueService.issueProject.Id !== self.currentIssue.Project.Id) {
                                    projectService
                                        .initCurrentProjectById(self.currentIssue.Project.Id)
                                        .then(function(success) {
                                            self.issueProject = success;
                                        }, function(error) {
                                            $.notify("Can't find this issue's project!", "error");
                                        });
                                }
                            }, function(error) {
                                $.notify("Can't find this issue!", "error");
                            });

                        //////////////////////
                        // Issue's Comments //
                        //////////////////////
                        if (!self.issueComments) {
                            issueService
                                .initCommentsByIssueId(issueId)
                                .then(function(success) {
                                    self.issueComments = success;
                                }, function(error) {
                                    $.notify('Some error occurred when tried to get the comments!', 'error');
                                })
                        }
                    }
                }
            }
        ]);
}());
