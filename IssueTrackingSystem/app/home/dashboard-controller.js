'use strict';

angular
    .module('issueTrackingSystem.home.dashboardController',[])
    .controller('DashboardCtrl',[
        'issueService',
        'identityService',
        'projectService',
        'Pagination',
        '$q',
        '$http',
        'BASE_URL',
        function DashboardCtrl(issueService, identityService, projectService, Pagination, $q, $http, BASE_URL) {
            var self = this;

            //////////
            // Init //
            //////////
            init();

            function init() {
                /////////////////
                // My Projects //
                /////////////////
                if (!self.myProjects) {
                    projectService
                        .initMyProjects()
                        .then(function (success) {
                            self.myProjects = success;
                            self.projectsPagination = Pagination.getNew(5);
                            self.projectsPagination.numPages = Math.ceil(self.myProjects.length / self.projectsPagination.perPage);
                        }, function (error) {
                            $.notify("Error occurred when tried to get your projects!", "error");
                        });
                }

                if (!self.myIssues) {
                    issueService
                        .initMyIssues()
                        .then(function (success) {
                            ////////////
                            // Issues //
                            ////////////
                            self.myIssues = success;
                            self.issuesPagination = Pagination.getNew(5);
                            self.issuesPagination.numPages = Math.ceil(self.myIssues.length / self.issuesPagination.perPage);

                            ///////////////////////
                            // Assigned Projects //
                            ///////////////////////
                            if (!self.assignedProjects) {
                                projectService
                                    .initAssignedProjects()
                                    .then(function (success) {
                                        self.assignedProjects = success;
                                        self.assignedProjectsPagination = Pagination.getNew(5);
                                        self.assignedProjectsPagination.numPages = Math.ceil(self.assignedProjects.length / self.assignedProjectsPagination.perPage);
                                    }, function (error) {
                                        $.notify("Error occurred when the server tried to get your assigned projects!", "error");
                                    });
                            }
                        }, function (error) {
                            $.notify("Error occurred when tried to get your issues!", "error");
                        });
                }
            }
        }]);