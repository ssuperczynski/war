(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.dashboard')
        .directive('ironCounter', ironCounter);

    ironCounter.$inject = ['CounterService'];

    function ironCounter() {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope, CounterService) {
                $scope.getIronCounter = function () {
                    return CounterService.getIronCounter();
                };
            },
            transclude: true,
            template: '<h3>' +
            '<img src="bundles/mainfrontend/images/factory.png" /> ' +
            '<span class="label label-default" ng-bind="getIronCounter()"></span>' +
            '</h3>'
        };
    }
})();
