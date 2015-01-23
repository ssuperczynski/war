(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.dashboard')
        .directive('concreteCounter', concreteCounter);

    concreteCounter.$inject = ['CounterService'];

    function concreteCounter() {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope, CounterService) {
                $scope.getConcreteCounter = function () {
                    return CounterService.getConcreteCounter();
                };
            },
            transclude: true,
            template: '<h3>' +
            '<img src="bundles/mainfrontend/images/cement.png" /> ' +
            '<span class="label label-default" ng-bind="getConcreteCounter()"></span>' +
            '</h3>'
        };
    }
})();
