(function() {
    'use strict';

    angular.module('issueTrackingSystem.projects', [
        'issueTrackingSystem.projects.projectService',
        'issueTrackingSystem.projects.projectController',
        'issueTrackingSystem.projects.addProjectController',
        'issueTrackingSystem.projects.editProjectController',
        'issueTrackingSystem.projects.allProjectsController'
    ]);
}());
