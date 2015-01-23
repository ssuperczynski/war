(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.dashboard')
        .directive('foodCounter', foodCounter);

    foodCounter.$inject = ['CounterService'];

    function foodCounter() {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope, CounterService) {
                $scope.getFoodCounter = function () {
                    return CounterService.getFoodCounter();
                };
            },
            transclude: true,
            template: '<h3>' +
            '<img src="bundles/mainfrontend/images/food.png" /> ' +
            '<span class="label label-default" ng-bind="getFoodCounter()"></span>' +
            '</h3>'
        };
    }
})();
