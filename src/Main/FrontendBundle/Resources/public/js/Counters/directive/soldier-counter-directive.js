(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.dashboard')
        .directive('soldierCounter', soldierCounter);

    soldierCounter.$inject = ['CounterService'];

    function soldierCounter() {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope, CounterService) {
                $scope.soldierCounter = function () {
                    return CounterService.getSoldierCounter();
                };
            },
            transclude: true,
            template: '<h4>\n    <img src="bundles/mainfrontend/images/soldier.png" />\n    <span class="label label-default" ng-bind="soldierCounter()"></span>\n</h4>'
        };
    }
})();
