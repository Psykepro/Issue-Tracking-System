(function() {
    'use strict';

    angular
        .module('issueTrackingSystem.projects.editProjectController', [])
        .controller('EditProjectCtrl', [
            '$scope',
            '$route',
            '$routeParams',
            'projectService',
            'identityService',
            function EditProjectCtrl($scope, $route, $routeParams, projectService, identityService) {
                var currentId = parseInt($routeParams.id),
                    self = this;

                //////////
                // Init //
                //////////
                init();

                self.updateProject = function updateProject(project) {

                    ///////////////////////////////////
                    // Formatting the binding object //
                    ///////////////////////////////////
                    project = projectService.formatBindingProjectModel(project);

                    projectService
                        .updateProjectRequest(currentId, project)
                        .then(function(success) {
                            $.notify('You successfully edited the project!', 'success');

                            /////////////////////////////////////////////////
                            // Update properties currentProject reference //
                            /////////////////////////////////////////////////
                            projectService.updateCurrentProject(success.data);
                        }, function(error) {
                            $.notify('You added invalid information!', 'error');
                        });
                };

                function init() {
                    self.isAdmin = identityService.isAdmin;

                    //////////////////////////////////////////////////////////
                    // Check if need to update the currentProject reference //
                    //////////////////////////////////////////////////////////
                    if (!self.editProject || self.editProject.Id !== currentId) {
                        projectService
                            .initCurrentProjectById(currentId)
                            .then(function(success) {
                                self.editProject = projectService.formatViewEditProjectModel(angular.copy(success));
                            })
                    }
                }
            }
        ]);
}());
