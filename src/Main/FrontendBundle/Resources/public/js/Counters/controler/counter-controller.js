(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .controller('CountersCtrl', CountersCtrl);

    CountersCtrl.$inject = ['$scope', 'CounterService'];

    function CountersCtrl($scope, CounterService) {

        $scope.soldierCounter = function () {
            return CounterService.getSoldierCounter();
        };

        $scope.concreteCounter = function () {
            return CounterService.getConcreteCounter();
        };


    }

})();
