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
            template: '<h4>\n    <img src="bundles/mainfrontend/images/food.png" />\n    <span class="label label-default" ng-bind="getFoodCounter()"></span>\n    <!--<span class="label label-success">-->\n        <!--<span class="glyphicon glyphicon-circle-arrow-up"></span>-->\n    <!--</span>-->\n</h4>'
        };
    }
})();
