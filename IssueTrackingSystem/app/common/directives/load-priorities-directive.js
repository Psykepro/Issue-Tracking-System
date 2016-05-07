'use strict';

angular
    .module('issueTrackingSystem.common.directives.loadPrioritiesDirective', [])
    .directive('loadPriorities', [function loadPriorities() {
            return {
                restrict: 'A',
                scope: {
                    selectedId: '@',
                    priorities: '@'
                },
                link: function (scope, element, attributes) {
                    var fragment,
                        selectElement,
                        priorities,
                        id;

                    attributes.$observe('selectedId', function (value) {
                        if (value) {
                            id = value;
                        }
                    });

                    attributes.$observe('priorities', function (value) {
                        if (value) {
                            selectElement = element[0];
                            priorities = eval(value);
                            fragment = generatePrioritiesOptionsFragment(priorities);
                            selectElement.appendChild(fragment);

                            // Setting the selected option if it have been passed \\
                            if(id){
                                setSelectedOption(id, selectElement);
                            }
                        }
                    });





                }
            };
        }]);