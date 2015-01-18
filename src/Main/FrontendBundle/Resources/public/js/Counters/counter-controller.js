(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .controller('CountersCtrl', CountersCtrl);

    CountersCtrl.$inject = ['$scope', 'SoldierService'];

    function CountersCtrl($scope, SoldierService) {

        $scope.soldierCounter = function () {
            return SoldierService.getCounter();
        };


    }

})();
