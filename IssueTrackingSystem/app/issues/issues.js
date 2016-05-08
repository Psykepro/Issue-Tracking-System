(function() {
    'use strict';

    angular.module('issueTrackingSystem.issues', [
        'issueTrackingSystem.issues.issueService',
        'issueTrackingSystem.issues.issueController',
        'issueTrackingSystem.issues.addIssueController',
        'issueTrackingSystem.issues.editIssueController'
    ]);
}());
