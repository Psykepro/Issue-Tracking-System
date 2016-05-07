'use strict';

angular
    .module('issueTrackingSystem.projects.allProjectsController', [])
    .controller('AllProjectsCtrl',[
        'projectService',
        'Pagination',
        function(projectService, Pagination) {
            var self = this;
            var previousLength;

            init();


            function init() {
                /////////////////////////////////////////////////
                // Check if need to get the projects reference //
                /////////////////////////////////////////////////
                if (!self.allProjects || self.allProjects.Length !== previousLength) {
                    projectService
                        .initProjects()
                        .then(function (success) {
                            previousLength = success.Length;
                            self.allProjects = success;

                            //self.projectsPagination = Pagination.getNew(10);
                            //self.projectsPagination.numPages = Math.ceil(self.allProjects.length / self.projectsPagination.perPage);
                        })
                }
            }
        }]);