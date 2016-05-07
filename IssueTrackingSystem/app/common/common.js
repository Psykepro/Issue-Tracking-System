angular.module('issueTrackingSystem.common', [
    'issueTrackingSystem.common.filters.join',
    'issueTrackingSystem.common.services.labelService',
    'issueTrackingSystem.common.services.identityService',
    'issueTrackingSystem.common.directives.loadUsersDirective',
    'issueTrackingSystem.common.services.authenticationService',
    'issueTrackingSystem.common.directives.loadPrioritiesDirective'
]);