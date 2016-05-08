(function(){
    'use strict';

angular
    .module('issueTrackingSystem.common.directives.loadUsersDirective', [])
    .directive('loadUsers', [
        'userService',
        function loadUsers(userService) {
            return {
                restrict: 'A',
                scope: {
                    selectedId: '@'
                },
                link: function (scope, element, attributes) {
                    var fragment,
                        selectElement,
                        id;
                    attributes.$observe('selectedId', function (value) {
                        if (value) {
                            id = value;
                        }
                    });

                    userService
                        .getAllUsersRequest()
                        .then(function (success) {
                            scope.users = success;
                            fragment = generateUsersOptionsFragment(scope.users);
                            selectElement = element[0];
                            selectElement.appendChild(fragment);

                            // Set the selected lead id if it is passed
                            if (id) {
                                setSelectedOption(id, selectElement);
                            }
                        });
                }
            };
        }]);
}());
