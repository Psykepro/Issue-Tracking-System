(function() {
    'use strict';

    angular
        .module('issueTrackingSystem', [
            'ngRoute',
            'ngMaterial',
            'simplePagination',
            'angularModalService',
            'issueTrackingSystem.home',
            'issueTrackingSystem.user',
            'issueTrackingSystem.issues',
            'issueTrackingSystem.common',
            'issueTrackingSystem.projects'
        ])
        .config(['$routeProvider', function configApp($routeProvider) {
            $routeProvider
                .otherwise({
                    redirectTo: '/'
                })
                .when('/', {
                    templateUrl: 'app/home/home.html'
                })
                .when('/users', {
                    templateUrl: 'app/user/users.html',
                    controller: 'UsersCtrl',
                    controllerAs: 'vm'
                })
                .when('/profile/password', {
                    templateUrl: 'app/user/user-change-password.html',
                    controller: 'UsersCtrl',
                    controllerAs: 'vm'
                })
                .when('/projects', {
                    templateUrl: 'app/projects/all-projects.html',
                    controller: 'AllProjectsCtrl',
                    controllerAs: 'vm'
                })
                .when('/projects/:id', {
                    templateUrl: 'app/projects/project-page.html',
                    controller: 'ProjectCtrl',
                    controllerAs: 'vm'
                })
                .when('/issues/:id', {
                    templateUrl: 'app/issues/issue-page.html',
                    controller: 'IssueCtrl',
                    controllerAs: 'vm'
                });
        }])
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
}());
