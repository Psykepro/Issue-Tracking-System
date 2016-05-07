'use strict';

angular.module('issueTrackingSystem.issues.issueService',[])
    .factory('issueService',[
        '$q',
        '$http',
        'BASE_URL',
        function issueService($q, $http, BASE_URL) {
            var myIssues = null;
            var currentIssue = null;
            var issueComments = null;
            var projectIssues = null;

            var issueService = {
                initProjectIssues: initProjectIssues,
                updateProjectIssues: updateProjectIssues,
                initCommentsByIssueId: initCommentsByIssueId,
                updateCommentsByIssueId: updateCommentsByIssueId,
                initMyIssues: initMyIssues,
                updateMyIssues: updateMyIssues,
                initCurrentIssueById: initCurrentIssueById,
                updateCurrentIssue: updateCurrentIssue,
                updateCurrentIssueStatus: updateCurrentIssueStatus,
                getIssuesByProjectId: getIssuesByProjectId,
                getMyIssuesRequest: getMyIssuesRequest,
                addIssueRequest: addIssueRequest,
                getIssueByIdRequest: getIssueByIdRequest,
                updateIssueRequest: updateIssueRequest,
                addIssueCommentRequest: addIssueCommentRequest,
                getIssueCommentsRequest: getIssueCommentsRequest,
                updateIssueStatusRequest: updateIssueStatusRequest,
                formatViewEditIssueModel: formatViewEditIssueModel,
                formatBindingIssueModel: formatBindingIssueModel,
                logout: logout
            };

            function updateProjectIssues(id) {
                issueService
                    .getIssuesByProjectId(id)
                    .then(function (success) {
                        projectIssues.ShallowCopy(success);
                    });
            }

            function initProjectIssues(id) {
                var deferred = $q.defer();

                if (!issueComments) {
                    issueService
                        .getIssuesByProjectId(id)
                        .then(function (success) {
                            projectIssues = success;
                            deferred.resolve(projectIssues);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(projectIssues);
                }

                return deferred.promise;
            }
            function updateCommentsByIssueId(id) {
                issueService
                    .getIssueCommentsRequest(id)
                    .then(function (success) {
                        issueComments.ShallowCopy(success);
                    });
            }

            function initCommentsByIssueId(id) {
                var deferred = $q.defer();

                if (!issueComments) {
                    issueService
                        .getIssueCommentsRequest(id)
                        .then(function (success) {
                            issueComments = success;
                            deferred.resolve(issueComments);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(issueComments);
                }

                return deferred.promise;
            }

            function updateMyIssues() {
                issueService
                    .getMyIssuesRequest()
                    .then(function (success) {
                        myIssues.ShallowCopy(success);
                    });
            }

            function initMyIssues() {
                var deferred = $q.defer();

                if (!myIssues) {
                    issueService
                        .getMyIssuesRequest()
                        .then(function (success) {
                            myIssues = success;
                            deferred.resolve(myIssues);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(myIssues);
                }

                return deferred.promise;
            }

            function updateCurrentIssue(updatedIssue) {
                currentIssue.ShallowCopy(updatedIssue);
            }

            function initCurrentIssueById(id) {
                var deferred = $q.defer();

                if (!currentIssue || currentIssue.Id !== id) {
                    issueService
                        .getIssueByIdRequest(id)
                        .then(function (success) {
                            currentIssue = success;
                            deferred.resolve(currentIssue);
                        }, function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(currentIssue);
                }

                return deferred.promise;
            }

            function getIssuesByProjectId(projectId){
                var deferred = $q.defer();
                var accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'projects/' + projectId + '/issues')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getMyIssuesRequest(pageSize, pageNumber, orderBy) {
                var deferred = $q.defer();
                var accessToken = sessionStorage["userAuth"];
                pageSize = pageSize || 10;
                pageNumber = pageNumber || 1;
                orderBy = orderBy || 'DueDate desc';

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                    .then(function (success) {
                        deferred.resolve(success.data.Issues);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssueRequest(issue) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.post(BASE_URL + 'issues/', issue)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssueCommentRequest(id, comment) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.post(BASE_URL + 'issues/' + id + '/comments', comment)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueCommentsRequest(id) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/' + id + '/comments')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueByIdRequest(id) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'issues/' + id)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function updateCurrentIssueStatus(issueId) {
                issueService
                    .getIssueByIdRequest(issueId)
                    .then(function (success) {
                        currentIssue.Status = success.Status;
                        currentIssue.AvailableStatuses = success.AvailableStatuses;
                    });
            }

            function updateIssueStatusRequest(issueId, statusId) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function updateIssueRequest(id, editedIssue) {
                var deferred = $q.defer(),
                    accessToken = sessionStorage["userAuth"];

                editedIssue = formatBindingIssueModel(editedIssue);
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
                $http.put(BASE_URL + 'issues/' + id, editedIssue)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function formatViewEditIssueModel(issue) {
                issue.DueDate = new Date(issue.DueDate);
                issue.Labels = issue.Labels.map(function (labelObj) {
                    return labelObj.Name;
                }).join(', ');

                return issue;
            }

            function logout(){
                myIssues = null;
                currentIssue = null;
                issueComments = null;
                projectIssues = null;
            }

            function formatBindingIssueModel(issue, projectId) {
                issue.ProjectId = parseInt(projectId);
                issue.AssigneeId = issue.Assignee.Id;
                issue.PriorityId = parseInt(issue.Priority.Id);
                issue.Labels = issue.Labels
                    .split(', ')
                    .map(function (label) {
                        return {
                            Name: label
                        }
                    });

                return issue;
            }

            return issueService;
        }]);