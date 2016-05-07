'use strict';

angular.module('issueTrackingSystem.common.services.identityService',[])
    .factory('identityService',[
        function identity() {
            var identity = {
                isAuthenticated: isAuthenticated,
                isAdmin: isAdmin,
                isProjectLeader: isProjectLeader,
                isIssueAssignee: isIssueAssignee
            };

            function isAuthenticated() {
                var accessToken = sessionStorage["userAuth"];
                return accessToken;
            }

            function isAdmin() {
                var isAdmin = sessionStorage["isAdmin"],
                    result;

                if(isAdmin === 'true'){
                    result = true;
                }else{
                    result = false;
                }

                return result;
            }

            function isProjectLeader(project) {
                if(!project){
                    return;
                }
                var userId = sessionStorage['userId'];
                return project.Lead.Id === userId;
            }

            function isIssueAssignee(issue){
                if(!issue){
                    return;
                }
                var userId = sessionStorage['userId'];
                return issue.Assignee.Id === userId;
            }
            return identity;
        }]);