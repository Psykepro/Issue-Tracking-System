(function(){
    'use strict';
    
    angular.module('issueTrackingSystem.common.filters.join', [])
    .filter('join', function() {
        return function (input, joinString) {
            var result,
                mappedArray;
            if(input){
                mappedArray = input.map(function (obj) {
                    return obj.Name;
                });
                result = mappedArray.join(joinString);
            }

            return result;
        };
    });
}());
